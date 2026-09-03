import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class AuditScreen extends StatefulWidget {
  const AuditScreen({super.key});

  @override
  State<AuditScreen> createState() => _AuditScreenState();
}

class _AuditScreenState extends State<AuditScreen> {
  String _searchQuery = '';
  String _riskFilter = 'ALL';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<AppProvider>().loadAuditLogs();
    });
  }

  List<Map<String, dynamic>> _applyFilters(List<Map<String, dynamic>> allLogs) {
    return allLogs.where((log) {
      final symbol = (log['details'] ?? '').toString().toLowerCase();
      final action = (log['action'] ?? '').toString().toLowerCase();
      final matchesSearch = _searchQuery.isEmpty ||
          symbol.contains(_searchQuery.toLowerCase()) ||
          action.contains(_searchQuery.toLowerCase());

      final riskLevel = (log['risk_score'] ?? '').toString().toUpperCase();
      final matchesRisk = _riskFilter == 'ALL' || riskLevel == _riskFilter;

      return matchesSearch && matchesRisk;
    }).toList();
  }

  Color _getRiskColor(String? risk) {
    switch (risk?.toUpperCase()) {
      case 'HIGH':
        return Colors.red;
      case 'MEDIUM':
        return Colors.orange;
      case 'LOW':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, child) {
        final filtered = _applyFilters(provider.auditLogs);

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Audit Log',
                      style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    Text(
                      '${provider.auditLogs.length} entries',
                      style: const TextStyle(color: Colors.white54, fontSize: 12),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                TextField(
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    hintText: 'Search by action or details...',
                    hintStyle: const TextStyle(color: Colors.white38),
                    prefixIcon: const Icon(Icons.search, color: Colors.white38),
                    filled: true,
                    fillColor: const Color(0xFF161B22),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide.none,
                    ),
                  ),
                  onChanged: (value) => setState(() => _searchQuery = value),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    const Text('Risk:', style: TextStyle(color: Colors.white70)),
                    const SizedBox(width: 10),
                    DropdownButton<String>(
                      value: _riskFilter,
                      dropdownColor: const Color(0xFF161B22),
                      style: const TextStyle(color: Colors.white),
                      underline: Container(height: 1, color: Colors.white24),
                      items: ['ALL', 'LOW', 'MEDIUM', 'HIGH']
                          .map((r) => DropdownMenuItem(value: r, child: Text(r)))
                          .toList(),
                      onChanged: (value) => setState(() => _riskFilter = value ?? 'ALL'),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Expanded(
                  child: filtered.isEmpty
                      ? _buildEmptyState()
                      : RefreshIndicator(
                    onRefresh: () => provider.loadAuditLogs(),
                    child: ListView.builder(
                      physics: const AlwaysScrollableScrollPhysics(),
                      itemCount: filtered.length,
                      itemBuilder: (context, index) {
                        final log = filtered[index];
                        return _AuditLogTile(log: log, riskColor: _getRiskColor);
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildEmptyState() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.fact_check_outlined, color: Colors.white38, size: 48),
          SizedBox(height: 16),
          Text('No Audit Records', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          Text(
            'AI decisions and trade executions will appear here automatically.',
            style: TextStyle(color: Colors.white54),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _AuditLogTile extends StatelessWidget {
  final Map<String, dynamic> log;
  final Color Function(String?) riskColor;

  const _AuditLogTile({required this.log, required this.riskColor});

  @override
  Widget build(BuildContext context) {
    final action = log['action'] ?? 'Unknown';
    final details = log['details'] ?? '';
    final riskScore = log['risk_score']?.toString();
    final createdAt = log['created_at'] ?? '';

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF161B22),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  action,
                  style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                ),
              ),
              if (riskScore != null && riskScore.isNotEmpty)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: riskColor(riskScore).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: riskColor(riskScore)),
                  ),
                  child: Text(
                    riskScore.toUpperCase(),
                    style: TextStyle(color: riskColor(riskScore), fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
            ],
          ),
          if (details.toString().isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              details,
              style: const TextStyle(color: Colors.white70, fontSize: 13),
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
            ),
          ],
          const SizedBox(height: 8),
          Text(
            createdAt.toString().substring(0, createdAt.toString().length > 16 ? 16 : createdAt.toString().length),
            style: const TextStyle(color: Colors.white38, fontSize: 11),
          ),
        ],
      ),
    );
  }
}
