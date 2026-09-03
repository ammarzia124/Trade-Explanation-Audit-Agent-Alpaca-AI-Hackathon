class Portfolio {
  final double portfolioValue;
  final int todayTrades;
  final int riskAlerts;
  final List<double> weeklyTrend; // for chart

  Portfolio({
    required this.portfolioValue,
    required this.todayTrades,
    required this.riskAlerts,
    required this.weeklyTrend,
  });

  factory Portfolio.fromJson(Map<String, dynamic> json) {
    return Portfolio(
      portfolioValue: (json['portfolioValue'] as num).toDouble(),
      todayTrades: json['todayTrades'],
      riskAlerts: json['riskAlerts'],
      weeklyTrend: (json['weeklyTrend'] as List)
          .map((e) => (e as num).toDouble())
          .toList(),
    );
  }
}