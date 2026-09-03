import 'package:flutter/material.dart';
import '../models/trade.dart';
import 'risk_badge.dart';

class TradeCard extends StatelessWidget {
  final Trade trade;
  final VoidCallback? onTap;

  const TradeCard({super.key, required this.trade, this.onTap});

  Color _statusColor() {
    switch (trade.status) {
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

  IconData _statusIcon() {
    switch (trade.status) {
      case 'FILLED':
        return Icons.check_circle;
      case 'PENDING':
        return Icons.access_time;
      case 'CANCELLED':
        return Icons.cancel;
      default:
        return Icons.help;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isBuy = trade.side == 'BUY';

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
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
                Row(
                  children: [
                    Hero(
                      tag: 'symbol-${trade.id}',
                      child: Material(
                        color: Colors.transparent,
                        child: Text(
                          trade.symbol,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    RiskBadge(riskScore: trade.riskScore),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: (isBuy ? Colors.blue : Colors.pinkAccent).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    trade.side,
                    style: TextStyle(
                      color: isBuy ? Colors.blueAccent : Colors.pinkAccent,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              trade.companyName,
              style: const TextStyle(color: Colors.white54, fontSize: 13),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '\$${trade.total.toStringAsFixed(0)}',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Row(
                  children: [
                    Icon(_statusIcon(), color: _statusColor(), size: 16),
                    const SizedBox(width: 4),
                    Text(
                      trade.status,
                      style: TextStyle(
                        color: _statusColor(),
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}