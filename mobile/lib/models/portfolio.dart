class Portfolio {
  final double portfolioValue;
  final double cash;
  final double buyingPower;
  final int todayTrades;
  final int riskAlerts;
  final List<double> weeklyTrend;

  Portfolio({
    required this.portfolioValue,
    this.cash = 0,
    this.buyingPower = 0,
    this.todayTrades = 0,
    this.riskAlerts = 0,
    this.weeklyTrend = const [],
  });

  factory Portfolio.fromAlpacaAccount(Map<String, dynamic> json, {int todayTrades = 0, int riskAlerts = 0, List<double>? weeklyTrend}) {
    return Portfolio(
      portfolioValue: _toDouble(json['equity'] ?? json['portfolio_value']),
      cash: _toDouble(json['cash']),
      buyingPower: _toDouble(json['buying_power']),
      todayTrades: todayTrades,
      riskAlerts: riskAlerts,
      weeklyTrend: weeklyTrend ?? [],
    );
  }

  static double _toDouble(dynamic value) {
    if (value is double) return value;
    if (value is int) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    if (value is num) return value.toDouble();
    return 0.0;
  }
}
