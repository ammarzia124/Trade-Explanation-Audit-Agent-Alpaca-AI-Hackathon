class Trade {
  final String id;
  final String symbol;
  final String side;
  final String qty;
  final String? filledAvgPrice;
  final String status;
  final String? orderType;
  final String? timeInForce;
  final String? filledAt;
  final String? aiExplanation;
  final int? riskScore;
  final String? riskCategory;
  final String createdAt;

  Trade({
    required this.id,
    required this.symbol,
    required this.side,
    required this.qty,
    this.filledAvgPrice,
    required this.status,
    this.orderType,
    this.timeInForce,
    this.filledAt,
    this.aiExplanation,
    this.riskScore,
    this.riskCategory,
    required this.createdAt,
  });

  factory Trade.fromJson(Map<String, dynamic> json) {
    return Trade(
      id: json['id'] ?? '',
      symbol: json['symbol'] ?? '',
      side: json['side'] ?? '',
      qty: json['qty'] ?? '0',
      filledAvgPrice: json['filled_avg_price'],
      status: json['status'] ?? '',
      orderType: json['order_type'],
      timeInForce: json['time_in_force'],
      filledAt: json['filled_at'],
      aiExplanation: json['ai_explanation'],
      riskScore: json['risk_score'],
      riskCategory: json['risk_category'],
      createdAt: json['created_at'] ?? DateTime.now().toIso8601String(),
    );
  }

  bool get isBuy => side == 'buy';
  bool get hasAnalysis => aiExplanation != null;
}
