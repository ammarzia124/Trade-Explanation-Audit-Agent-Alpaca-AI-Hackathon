import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../widgets/trade_card.dart';
import 'trade_detail_screen.dart';

class TradesScreen extends StatelessWidget {
  const TradesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, child) {
        if (provider.isLoading && provider.trades.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Trades',
                  style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                Expanded(
                  child: provider.trades.isEmpty
                      ? _buildEmptyState(provider)
                      : RefreshIndicator(
                    onRefresh: () => provider.refreshTrades(),
                    child: ListView.builder(
                      physics: const AlwaysScrollableScrollPhysics(),
                      itemCount: provider.trades.length,
                      itemBuilder: (context, index) {
                        final trade = provider.trades[index];
                        return TradeCard(
                          trade: trade,
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => TradeDetailScreen(trade: trade),
                              ),
                            );
                          },
                        );
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

  Widget _buildEmptyState(AppProvider provider) {
    return RefreshIndicator(
      onRefresh: () => provider.refreshTrades(),
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        children: const [
          SizedBox(height: 100),
          Icon(Icons.receipt_long_outlined, color: Colors.white38, size: 48),
          SizedBox(height: 16),
          Center(
            child: Text('No Trades Yet', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
          ),
          SizedBox(height: 8),
          Center(
            child: Text('Your trading activity will appear here.', style: TextStyle(color: Colors.white54)),
          ),
        ],
      ),
    );
  }
}