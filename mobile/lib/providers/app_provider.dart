import 'package:flutter/foundation.dart';
import '../models/trade.dart';
import '../models/portfolio.dart';
import '../services/api_service.dart';

class AppProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  Portfolio? portfolio;
  List<Trade> trades = [];
  List<Map<String, dynamic>> auditLogs = [];
  bool isLoading = false;
  String? errorMessage;

  Future<void> loadDashboardData() async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      final account = await _apiService.getAccountRaw();
      final summary = await _apiService.getSummaryRaw();
      final orders = await _apiService.getOrders();

      trades = orders;
      portfolio = Portfolio.fromAlpacaAccount(
        account,
        todayTrades: summary['total'] ?? orders.length,
        riskAlerts: summary['highRisk'] ?? 0,
        weeklyTrend: _buildTrend(orders, _toDouble(account['equity'])),
      );
    } catch (e) {
      errorMessage = 'Could not load data. Pull down to retry.';
      print('[AppProvider] loadDashboardData error: $e');
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
    try {
      trades = await _apiService.getOrders();
      notifyListeners();
    } catch (e) {
      print('[AppProvider] refreshTrades error: $e');
    }
  }

  Future<void> loadAuditLogs() async {
    try {
      auditLogs = await _apiService.getAuditLogs();
      notifyListeners();
    } catch (e) {
      print('[AppProvider] loadAuditLogs error: $e');
    }
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

  static double _toDouble(dynamic value) {
    if (value is double) return value;
    if (value is int) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    if (value is num) return value.toDouble();
    return 0.0;
  }
}
