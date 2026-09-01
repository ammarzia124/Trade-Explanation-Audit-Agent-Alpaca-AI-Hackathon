class AuditLog {
  final int id;
  final String? tradeId;
  final String action;
  final String? details;
  final int? riskScore;
  final String? riskCategory;
  final String createdAt;

  AuditLog({
    required this.id,
    this.tradeId,
    required this.action,
    this.details,
    this.riskScore,
    this.riskCategory,
    required this.createdAt,
  });

  factory AuditLog.fromJson(Map<String, dynamic> json) {
    return AuditLog(
      id: json['id'] ?? 0,
      tradeId: json['trade_id'],
      action: json['action'] ?? '',
      details: json['details'],
      riskScore: json['risk_score'],
      riskCategory: json['risk_category'],
      createdAt: json['created_at'] ?? DateTime.now().toIso8601String(),
    );
  }
}
