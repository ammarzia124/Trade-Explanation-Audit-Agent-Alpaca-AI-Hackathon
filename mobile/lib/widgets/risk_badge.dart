import 'package:flutter/material.dart';

class RiskBadge extends StatelessWidget {
  final int riskScore;

  const RiskBadge({super.key, required this.riskScore});

  Color _getColor() {
    if (riskScore < 30) return Colors.green;
    if (riskScore < 60) return Colors.orange;
    return Colors.red;
  }

  String _getLabel() {
    if (riskScore < 30) return 'LOW';
    if (riskScore < 60) return 'MEDIUM';
    return 'HIGH';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: _getColor().withOpacity(0.15),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: _getColor()),
      ),
      child: Text(
        _getLabel(),
        style: TextStyle(
          color: _getColor(),
          fontSize: 11,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}