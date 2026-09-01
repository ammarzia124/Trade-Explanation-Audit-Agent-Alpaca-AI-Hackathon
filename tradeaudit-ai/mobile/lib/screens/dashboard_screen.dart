import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/trade_provider.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TradeAudit AI'),
        centerTitle: true,
      ),
      body: Consumer<TradeProvider>(
        builder: (context, provider, child) {
          if (provider.loading) {
            return const Center(child: CircularProgressIndicator());
          }

          return RefreshIndicator(
            onRefresh: provider.fetchTrades,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildSummaryCards(provider),
                const SizedBox(height: 24),
                _buildRecentTrades(provider),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildSummaryCards(TradeProvider provider) {
    final cards = [
      _CardData('Total Trades', provider.totalTrades.toString(), Icons.candlestick_chart, Colors.blue),
      _CardData('Buys', provider.buys.toString(), Icons.trending_up, Colors.green),
      _CardData('Sells', provider.sells.toString(), Icons.trending_down, Colors.red),
      _CardData('High Risk', provider.highRisk.toString(), Icons.warning, Colors.orange),
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 1.5,
      ),
      itemCount: cards.length,
      itemBuilder: (context, index) {
        final card = cards[index];
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(card.icon, color: card.color, size: 24),
                const SizedBox(height: 8),
                Text(
                  card.value,
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                Text(
                  card.label,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Colors.grey[600],
                      ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildRecentTrades(TradeProvider provider) {
    final recent = provider.trades.take(5).toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Recent Trades',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 12),
        if (recent.isEmpty)
          const Card(
            child: Padding(
              padding: EdgeInsets.all(32),
              child: Center(child: Text('No trades yet')),
            ),
          )
        else
          ...recent.map((trade) => Card(
                child: ListTile(
                  leading: Icon(
                    trade.isBuy ? Icons.trending_up : Icons.trending_down,
                    color: trade.isBuy ? Colors.green : Colors.red,
                  ),
                  title: Text(trade.symbol),
                  subtitle: Text(
                    '${trade.side.toUpperCase()} ${trade.qty} @ \$${trade.filledAvgPrice ?? '—'}',
                  ),
                  trailing: trade.riskScore != null
                      ? Chip(
                          label: Text('${trade.riskScore}/10'),
                          backgroundColor: _riskColor(trade.riskCategory),
                        )
                      : null,
                ),
              )),
      ],
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

class _CardData {
  final String label;
  final String value;
  final IconData icon;
  final Color color;

  _CardData(this.label, this.value, this.icon, this.color);
}
