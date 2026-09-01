import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/trade_provider.dart';
import '../models/trade.dart';

class TradesScreen extends StatelessWidget {
  const TradesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Trades'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => context.read<TradeProvider>().fetchTrades(),
          ),
        ],
      ),
      body: Consumer<TradeProvider>(
        builder: (context, provider, child) {
          if (provider.loading && provider.trades.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }

          if (provider.trades.isEmpty) {
            return const Center(child: Text('No trades found'));
          }

          return RefreshIndicator(
            onRefresh: provider.fetchTrades,
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: provider.trades.length,
              itemBuilder: (context, index) {
                final trade = provider.trades[index];
                return _TradeTile(trade: trade);
              },
            ),
          );
        },
      ),
    );
  }
}

class _TradeTile extends StatelessWidget {
  final Trade trade;

  const _TradeTile({required this.trade});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ExpansionTile(
        leading: Icon(
          trade.isBuy ? Icons.trending_up : Icons.trending_down,
          color: trade.isBuy ? Colors.green : Colors.red,
        ),
        title: Text(
          trade.symbol,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Text(
          '${trade.side.toUpperCase()} ${trade.qty} @ \$${trade.filledAvgPrice ?? '—'}',
        ),
        trailing: trade.riskScore != null
            ? CircleAvatar(
                radius: 16,
                backgroundColor: _riskColor(trade.riskCategory),
                child: Text(
                  '${trade.riskScore}',
                  style: const TextStyle(fontSize: 12),
                ),
              )
            : null,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (trade.aiExplanation != null) ...[
                  const Text(
                    'AI Analysis',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.blue,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(trade.aiExplanation!),
                ] else ...[
                  const Text(
                    'Not yet analyzed',
                    style: TextStyle(color: Colors.grey),
                  ),
                  const SizedBox(height: 8),
                  OutlinedButton.icon(
                    onPressed: () => context.read<TradeProvider>().analyzeTrade(trade.id),
                    icon: const Icon(Icons.psychology),
                    label: const Text('Analyze with AI'),
                  ),
                ],
              ],
            ),
          ),
        ],
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
