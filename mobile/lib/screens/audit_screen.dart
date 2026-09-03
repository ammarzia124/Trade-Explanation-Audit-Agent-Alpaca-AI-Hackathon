import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../models/trade.dart';
import '../widgets/trade_card.dart';
import 'trade_detail_screen.dart';

class AuditScreen extends StatefulWidget {
  const AuditScreen({super.key});

  @override
  State<AuditScreen> createState() => _AuditScreenState();
}

class _AuditScreenState extends State<AuditScreen> {
  String _searchQuery = '';
  String _riskFilter = 'ALL';

  List<Trade> _applyFilters(List<Trade> allTrades) {
    return allTrades.where((t) {
      final matchesSearch = _searchQuery.isEmpty ||
          t.symbol.toLowerCase().contains(_searchQuery.toLowerCase());

      final riskLabel = t.riskScore < 30
          ? 'LOW'
          : t.riskScore < 60
          ? 'MEDIUM'
          : 'HIGH';
      final matchesRisk = _riskFilter == 'ALL' || riskLabel == _riskFilter;

      return matchesSearch && matchesRisk;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, child) {
        final filtered = _applyFilters(provider.trades);

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Audit Log', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                TextField(
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    hintText: 'Search by symbol (e.g. AAPL)',
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
                      ? const Center(
                    child: Text('No Audit Records', style: TextStyle(color: Colors.white54)),
                  )
                      : ListView.builder(
                    itemCount: filtered.length,
                    itemBuilder: (context, index) {
                      final trade = filtered[index];
                      return TradeCard(
                        trade: trade,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => TradeDetailScreen(trade: trade)),
                          );
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}