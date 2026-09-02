import 'package:flutter/material.dart';
import '../models/trade.dart';

class TradeCard extends StatelessWidget {
  final Trade trade;
  final VoidCallback? onTap;

  const TradeCard({super.key, required this.trade, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              CircleAvatar(
                backgroundColor: trade.isBuy ? Colors.green.shade100 : Colors.red.shade100,
                child: Icon(
                  trade.isBuy ? Icons.trending_up : Icons.trending_down,
                  color: trade.isBuy ? Colors.green : Colors.red,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      trade.symbol,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text(
                      '${trade.side.toUpperCase()} ${trade.qty} @ \$${trade.filledAvgPrice ?? '—'}',
                      style: TextStyle(color: Colors.grey[600], fontSize: 14),
                    ),
                  ],
                ),
              ),
              if (trade.riskScore != null)
                CircleAvatar(
                  radius: 16,
                  backgroundColor: _riskColor(trade.riskCategory),
                  child: Text(
                    '${trade.riskScore}',
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Color _riskColor(String? category) {
    switch (category) {
      case 'low':
        return Colors.green.shade100;
      case 'medium':
        return Colors.yellow.shade100;
      case 'high':
        return Colors.orange.shade100;
      case 'critical':
        return Colors.red.shade100;
      default:
        return Colors.grey.shade100;
    }
  }
}
