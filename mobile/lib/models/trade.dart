class Trade {
  final String id;
  final String symbol;
  final String companyName;
  final String side; // BUY or SELL
  final int qty;
  final double price;
  final double total;
  final String status; // FILLED, PENDING, CANCELLED
  final String? reason;
  final int riskScore; // 0-100
  final String? aiExplanation;
  final DateTime timestamp;

  Trade({
    required this.id,
    required this.symbol,
    required this.companyName,
    required this.side,
    required this.qty,
    required this.price,
    required this.total,
    required this.status,
    this.reason,
    required this.riskScore,
    this.aiExplanation,
    required this.timestamp,
  });

  factory Trade.fromJson(Map<String, dynamic> json) {
    return Trade(
      id: json['id'],
      symbol: json['symbol'],
      companyName: json['companyName'] ?? '',
      side: json['side'],
      qty: json['qty'],
      price: (json['price'] as num).toDouble(),
      total: (json['total'] as num).toDouble(),
      status: json['status'],
      reason: json['reason'],
      riskScore: json['riskScore'] ?? 0,
      aiExplanation: json['aiExplanation'],
      timestamp: DateTime.parse(json['timestamp']),
    );
  }
}