class Trade {
  final String id;
  final String symbol;
  final String companyName;
  final String side;
  final int qty;
  final double price;
  final double total;
  final String status;
  final String? reason;
  final int riskScore;
  final String? aiExplanation;
  final DateTime timestamp;

  Trade({
    required this.id,
    required this.symbol,
    this.companyName = '',
    required this.side,
    required this.qty,
    required this.price,
    required this.total,
    required this.status,
    this.reason,
    this.riskScore = 0,
    this.aiExplanation,
    required this.timestamp,
  });

  String get riskLabel {
    if (riskScore < 30) return 'LOW';
    if (riskScore < 60) return 'MEDIUM';
    return 'HIGH';
  }

  factory Trade.fromDbTrade(Map<String, dynamic> json) {
    return Trade(
      id: json['id']?.toString() ?? json['order_id'] ?? '',
      symbol: json['symbol'] ?? '',
      side: (json['side'] ?? '').toUpperCase(),
      qty: _toInt(json['qty']),
      price: _toDouble(json['price']),
      total: _toDouble(json['total']),
      status: (json['status'] ?? '').toUpperCase(),
      riskScore: _parseRiskScore(json['risk_score']),
      aiExplanation: json['ai_explanation'],
      timestamp: DateTime.tryParse(json['timestamp'] ?? '') ?? DateTime.now(),
    );
  }

  factory Trade.fromAlpacaOrder(Map<String, dynamic> json) {
    final side = (json['side'] ?? '').toUpperCase();
    final qty = _toInt(json['qty']);
    final price = _toDouble(json['filled_avg_price'] ?? json['limit_price'] ?? json['price']);
    return Trade(
      id: json['id'] ?? '',
      symbol: json['symbol'] ?? '',
      side: side,
      qty: qty,
      price: price,
      total: qty * price,
      status: (json['status'] ?? '').toUpperCase(),
      timestamp: DateTime.tryParse(json['submitted_at'] ?? json['created_at'] ?? '') ?? DateTime.now(),
    );
  }

  static int _toInt(dynamic value) {
    if (value is int) return value;
    if (value is String) return int.tryParse(value) ?? 0;
    if (value is num) return value.toInt();
    return 0;
  }

  static double _toDouble(dynamic value) {
    if (value is double) return value;
    if (value is int) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    if (value is num) return value.toDouble();
    return 0.0;
  }

  static int _parseRiskScore(dynamic score) {
    if (score is int) return score;
    if (score is num) return score.toInt();
    if (score is String) {
      switch (score.toUpperCase()) {
        case 'LOW': return 15;
        case 'MEDIUM': return 45;
        case 'HIGH': return 75;
        default: return 0;
      }
    }
    return 0;
  }
}
