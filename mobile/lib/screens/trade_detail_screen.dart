import 'package:flutter/material.dart';
import '../models/trade.dart';
import '../services/api_service.dart';
import '../widgets/risk_badge.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class TradeDetailScreen extends StatefulWidget {
  final Trade trade;

  const TradeDetailScreen({super.key, required this.trade});

  @override
  State<TradeDetailScreen> createState() => _TradeDetailScreenState();
}

class _TradeDetailScreenState extends State<TradeDetailScreen> {
  final ApiService _apiService = ApiService();
  String? _explanation;
  bool _loadingExplanation = true;

  @override
  void initState() {
    super.initState();
    _loadExplanation();
  }

  Future<void> _loadExplanation() async {
    final provider = Provider.of<AppProvider>(context, listen: false);
    final portfolioValue = provider.portfolio?.portfolioValue ?? 0;
    final result = await _apiService.getExplanation(widget.trade, portfolioValue);
    setState(() {
      _explanation = result['explanation'];
      _loadingExplanation = false;
    });
  }

  Color _statusColor(String status) {
    switch (status) {
      case 'FILLED':
        return Colors.green;
      case 'PENDING':
        return Colors.orange;
      case 'CANCELLED':
        return Colors.redAccent;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final trade = widget.trade;
    final isBuy = trade.side == 'BUY';

    return Scaffold(
      backgroundColor: const Color(0xFF0D1117),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0D1117),
        title: const Text('Trade Detail', style: TextStyle(color: Colors.white)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
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
                      Row(
                        children: [
                          Hero(
                            tag: 'symbol-${trade.id}',
                            child: Material(
                              color: Colors.transparent,
                              child: Text(
                                trade.symbol,
                                style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),
                          RiskBadge(riskScore: trade.riskScore),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: (isBuy ? Colors.blue : Colors.pinkAccent).withOpacity(0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          trade.side,
                          style: TextStyle(
                            color: isBuy ? Colors.blueAccent : Colors.pinkAccent,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(trade.companyName, style: const TextStyle(color: Colors.white54, fontSize: 14)),
                  const Divider(color: Colors.white10, height: 32),
                  _detailRow('Quantity', '${trade.qty}'),
                  _detailRow('Price', '\$${trade.price.toStringAsFixed(2)}'),
                  _detailRow('Total', '\$${trade.total.toStringAsFixed(2)}'),
                  _detailRow('Timestamp', trade.timestamp.toString().substring(0, 16)),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Status', style: TextStyle(color: Colors.white54)),
                      Text(
                        trade.status,
                        style: TextStyle(color: _statusColor(trade.status), fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text('AI Explanation', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600)),
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF161B22),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.white10),
              ),
              child: _loadingExplanation
                  ? const Center(child: CircularProgressIndicator())
                  : Text(
                _explanation ?? 'No explanation available.',
                style: const TextStyle(color: Colors.white70, height: 1.5),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _detailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.white54)),
          Text(value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}