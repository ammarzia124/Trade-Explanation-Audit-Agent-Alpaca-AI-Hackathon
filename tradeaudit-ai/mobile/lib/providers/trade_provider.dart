import 'package:flutter/material.dart';
import '../models/trade.dart';
import '../services/api_service.dart';

class TradeProvider extends ChangeNotifier {
  final ApiService _api = ApiService();

  List<Trade> _trades = [];
  bool _loading = false;
  String? _error;

  List<Trade> get trades => _trades;
  bool get loading => _loading;
  String? get error => _error;

  int get totalTrades => _trades.length;
  int get buys => _trades.where((t) => t.isBuy).length;
  int get sells => _trades.where((t) => !t.isBuy).length;
  int get highRisk => _trades.where((t) =>
      t.riskCategory == 'high' || t.riskCategory == 'critical').length;

  double get avgRiskScore {
    if (_trades.isEmpty) return 0;
    final total = _trades.fold(0, (sum, t) => sum + (t.riskScore ?? 0));
    return total / _trades.length;
  }

  Future<void> fetchTrades() async {
    _loading = true;
    _error = null;
    notifyListeners();

    try {
      _trades = await _api.getTrades();
    } catch (e) {
      _error = e.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> analyzeTrade(String tradeId) async {
    try {
      final analyzed = await _api.analyzeTrade(tradeId);
      final index = _trades.indexWhere((t) => t.id == tradeId);
      if (index != -1) {
        _trades[index] = analyzed;
        notifyListeners();
      }
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
}
