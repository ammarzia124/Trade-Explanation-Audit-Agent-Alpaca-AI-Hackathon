import 'package:flutter/material.dart';
import '../models/trade.dart';

class TradeDetailScreen extends StatelessWidget {
  final Trade trade;

  const TradeDetailScreen({super.key, required this.trade});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(trade.symbol),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildHeader(context),
          const SizedBox(height: 24),
          _buildInfoGrid(context),
          if (trade.hasAnalysis) ...[
            const SizedBox(height: 24),
            _buildAnalysisCard(),
          ],
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          radius: 30,
          backgroundColor: trade.isBuy ? Colors.green.shade100 : Colors.red.shade100,
          child: Icon(
            trade.isBuy ? Icons.trending_up : Icons.trending_down,
            color: trade.isBuy ? Colors.green : Colors.red,
            size: 32,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                trade.symbol,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              Text(
                '${trade.side.toUpperCase()} ${trade.qty} shares',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInfoGrid(BuildContext context) {
    final items = [
      _GridItem('Status', trade.status),
      _GridItem('Price', trade.filledAvgPrice != null ? '\$${trade.filledAvgPrice}' : '—'),
      _GridItem('Type', trade.orderType ?? '—'),
      _GridItem('Time in Force', trade.timeInForce?.toUpperCase() ?? '—'),
      _GridItem('Risk Score', trade.riskScore != null ? '${trade.riskScore}/10' : '—'),
      _GridItem('Risk Category', trade.riskCategory ?? '—'),
    ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 3,
          childAspectRatio: 2,
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          children: items
              .map((item) => Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        item.label,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Colors.grey[600],
                            ),
                      ),
                      Text(
                        item.value,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                      ),
                    ],
                  ))
              .toList(),
        ),
      ),
    );
  }

  Widget _buildAnalysisCard() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.psychology, color: Colors.blue),
                SizedBox(width: 8),
                Text(
                  'AI Analysis',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(trade.aiExplanation!),
          ],
        ),
      ),
    );
  }
}

class _GridItem {
  final String label;
  final String value;

  _GridItem(this.label, this.value);
}
