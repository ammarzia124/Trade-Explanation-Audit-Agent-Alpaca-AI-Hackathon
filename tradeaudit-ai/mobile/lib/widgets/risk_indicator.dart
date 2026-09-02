import 'package:flutter/material.dart';

class RiskIndicator extends StatelessWidget {
  final int score;
  final String? category;
  final double size;

  const RiskIndicator({
    super.key,
    required this.score,
    this.category,
    this.size = 48,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: _getColor().withOpacity(0.15),
        shape: BoxShape.circle,
        border: Border.all(color: _getColor(), width: 2),
      ),
      child: Center(
        child: Text(
          '$score',
          style: TextStyle(
            color: _getColor(),
            fontWeight: FontWeight.bold,
            fontSize: size * 0.35,
          ),
        ),
      ),
    );
  }

  Color _getColor() {
    switch (category) {
      case 'low':
        return Colors.green;
      case 'medium':
        return Colors.yellow.shade700;
      case 'high':
        return Colors.orange;
      case 'critical':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}
