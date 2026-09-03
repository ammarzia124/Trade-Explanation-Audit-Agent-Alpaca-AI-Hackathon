import 'package:flutter/foundation.dart';
import '../models/trade.dart';
import '../models/portfolio.dart';
import '../services/api_service.dart';

class AppProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  Portfolio? portfolio;
  List<Trade> trades = [];
  bool isLoading = false;
  String? errorMessage;

  Future<void> loadDashboardData() async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      final account = await _apiService.getAccountRaw();
      final summary = await _apiService.getSummaryRaw();
      trades = await _apiService.getTrades();

      final equity = double.tryParse(account['equity']?.toString() ?? '') ??
          (summary['totalValue'] as num?)?.toDouble() ??
          0.0;

      portfolio = Portfolio(
        portfolioValue: equity,
        todayTrades: summary['total'] ?? trades.length,
        riskAlerts: summary['highRisk'] ?? 0,
        weeklyTrend: _buildTrend(trades, equity),
      );
    } catch (e) {
      errorMessage = 'Could not load data. Pull down to retry.';
    }

    isLoading = false;
    notifyListeners();
  }

  List<double> _buildTrend(List<Trade> tradeList, double currentEquity) {
    if (tradeList.isEmpty) return [currentEquity];
    final sorted = List<Trade>.from(tradeList)
      ..sort((a, b) => a.timestamp.compareTo(b.timestamp));
    final recent = sorted.length > 7 ? sorted.sublist(sorted.length - 7) : sorted;
    double running = currentEquity - recent.fold(0.0, (sum, t) => sum + t.total);
    return recent.map((t) {
      running += t.total;
      return running;
    }).toList();
  }

  Future<void> refreshDashboard() async => loadDashboardData();

  Future<void> refreshTrades() async {
    trades = await _apiService.getOrders();
    notifyListeners();
  }

  Map<String, int> get riskCounts {
    final counts = {'LOW': 0, 'MEDIUM': 0, 'HIGH': 0};
    for (final t in trades) {
      if (t.riskScore < 30) {
        counts['LOW'] = counts['LOW']! + 1;
      } else if (t.riskScore < 60) {
        counts['MEDIUM'] = counts['MEDIUM']! + 1;
      } else {
        counts['HIGH'] = counts['HIGH']! + 1;
      }
    }
    return counts;
  }
}