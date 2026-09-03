import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../widgets/summary_card.dart';
import 'settings_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<AppProvider>().loadDashboardData();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0D1117),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0D1117),
        title: const Text('Dashboard', style: TextStyle(color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings_outlined, color: Colors.white70),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const SettingsScreen()));
            },
          ),
        ],
      ),
      body: Consumer<AppProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading && provider.portfolio == null) {
            return _buildSkeletonLoader();
          }

          if (provider.errorMessage != null && provider.portfolio == null) {
            return _buildErrorState(provider);
          }

          final portfolio = provider.portfolio!;
          final riskCounts = provider.riskCounts;
          final totalRisk = riskCounts['LOW']! + riskCounts['MEDIUM']! + riskCounts['HIGH']!;

          return RefreshIndicator(
            onRefresh: () => provider.refreshDashboard(),
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: SummaryCard(
                          title: 'Portfolio Value',
                          value: '\$${portfolio.portfolioValue.toStringAsFixed(0)}',
                          icon: Icons.account_balance_wallet,
                          accentColor: Colors.blue,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: SummaryCard(
                          title: 'Today Trades',
                          value: '${portfolio.todayTrades}',
                          icon: Icons.swap_horiz,
                          accentColor: Colors.greenAccent,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  SummaryCard(
                    title: 'Risk Alerts',
                    value: '${portfolio.riskAlerts}',
                    icon: Icons.warning_amber_rounded,
                    accentColor: Colors.redAccent,
                  ),
                  const SizedBox(height: 24),
                  const Text('Weekly Trend', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 12),
                  Container(
                    height: 200,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF161B22),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: LineChart(
                      LineChartData(
                        gridData: const FlGridData(show: false),
                        titlesData: const FlTitlesData(show: false),
                        borderData: FlBorderData(show: false),
                        lineBarsData: [
                          LineChartBarData(
                            spots: portfolio.weeklyTrend.asMap().entries.map((e) => FlSpot(e.key.toDouble(), e.value)).toList(),
                            isCurved: true,
                            color: Colors.blueAccent,
                            barWidth: 3,
                            dotData: const FlDotData(show: false),
                            belowBarData: BarAreaData(show: true, color: Colors.blueAccent.withOpacity(0.15)),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text('Risk Breakdown', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 12),
                  Container(
                    height: 200,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF161B22),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: totalRisk == 0
                        ? const Center(child: Text('No trades yet to analyze.', style: TextStyle(color: Colors.white54)))
                        : Row(
                      children: [
                        Expanded(
                          child: PieChart(
                            PieChartData(
                              sectionsSpace: 3,
                              centerSpaceRadius: 30,
                              sections: [
                                PieChartSectionData(
                                  value: riskCounts['LOW']!.toDouble(),
                                  color: Colors.green,
                                  title: '${riskCounts['LOW']}',
                                  radius: 45,
                                  titleStyle: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                ),
                                PieChartSectionData(
                                  value: riskCounts['MEDIUM']!.toDouble(),
                                  color: Colors.orange,
                                  title: '${riskCounts['MEDIUM']}',
                                  radius: 45,
                                  titleStyle: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                ),
                                PieChartSectionData(
                                  value: riskCounts['HIGH']!.toDouble(),
                                  color: Colors.red,
                                  title: '${riskCounts['HIGH']}',
                                  radius: 45,
                                  titleStyle: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _legendDot(Colors.green, 'Low'),
                            const SizedBox(height: 8),
                            _legendDot(Colors.orange, 'Medium'),
                            const SizedBox(height: 8),
                            _legendDot(Colors.red, 'High'),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildSkeletonLoader() {
    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(child: _SkeletonCard(height: 100)),
              const SizedBox(width: 12),
              Expanded(child: _SkeletonCard(height: 100)),
            ],
          ),
          const SizedBox(height: 12),
          _SkeletonCard(height: 80),
          const SizedBox(height: 24),
          const Text('Weekly Trend', style: TextStyle(color: Colors.white54, fontSize: 16, fontWeight: FontWeight.w600)),
          const SizedBox(height: 12),
          _SkeletonCard(height: 200),
          const SizedBox(height: 24),
          const Text('Risk Breakdown', style: TextStyle(color: Colors.white54, fontSize: 16, fontWeight: FontWeight.w600)),
          const SizedBox(height: 12),
          _SkeletonCard(height: 200),
        ],
      ),
    );
  }

  Widget _legendDot(Color color, String label) {
    return Row(
      children: [
        Container(width: 10, height: 10, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 6),
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 12)),
      ],
    );
  }

  Widget _buildErrorState(AppProvider provider) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.cloud_off, color: Colors.white38, size: 48),
            const SizedBox(height: 16),
            Text(provider.errorMessage ?? 'Something went wrong', style: const TextStyle(color: Colors.white70), textAlign: TextAlign.center),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: () => provider.loadDashboardData(), child: const Text('Retry')),
          ],
        ),
      ),
    );
  }
}

class _SkeletonCard extends StatefulWidget {
  final double height;

  const _SkeletonCard({required this.height});

  @override
  State<_SkeletonCard> createState() => _SkeletonCardState();
}

class _SkeletonCardState extends State<_SkeletonCard> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
    _animation = Tween<double>(begin: 0.3, end: 0.7).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          height: widget.height,
          decoration: BoxDecoration(
            color: const Color(0xFF161B22),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: Colors.white10),
          ),
          child: Opacity(
            opacity: _animation.value,
            child: Container(
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.08),
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        );
      },
    );
  }
}
