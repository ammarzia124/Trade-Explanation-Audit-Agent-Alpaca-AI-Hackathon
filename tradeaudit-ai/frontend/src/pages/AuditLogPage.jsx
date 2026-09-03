import { useEffect } from 'react';
import { useTrades } from '../context/TradeContext';
import { formatDate } from '../utils/helpers';
import { FileText, Shield, AlertTriangle, XCircle } from 'lucide-react';

export default function AuditLogPage() {
  const { auditLogs, fetchAuditLogs } = useTrades();

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const getRiskBadge = (risk) => {
    const value = String(risk || 'LOW').toUpperCase();
    if (value === 'HIGH') {
      return (
        <span className="inline-flex items-center gap-1 rounded-pill bg-danger-muted px-2.5 py-1 text-micro font-medium text-danger">
          <XCircle size={12} />
          HIGH
        </span>
      );
    }
    if (value === 'MEDIUM') {
      return (
        <span className="inline-flex items-center gap-1 rounded-pill bg-warning-muted px-2.5 py-1 text-micro font-medium text-warning">
          <AlertTriangle size={12} />
          MEDIUM
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-pill bg-success-muted px-2.5 py-1 text-micro font-medium text-success">
        <Shield size={12} />
        LOW
      </span>
    );
  };

  return (
    <div className="space-y-section">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-text-primary">Audit Log</h1>
          <p className="section-subtitle">History of trade analyses and system actions</p>
        </div>
        <span className="text-caption text-text-muted">{auditLogs.length} entries</span>
      </div>

      {auditLogs.length === 0 ? (
        <div className="card text-center py-16">
          <FileText size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-primary font-medium">No audit entries yet</p>
          <p className="text-caption text-text-muted mt-1">Actions like trade analysis and chat queries will appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {auditLogs.map(log => (
            <div key={log.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-medium text-text-primary">{log.action}</span>
                    {log.risk_score && getRiskBadge(log.risk_category)}
                  </div>
                  {log.details && (
                    <p className="text-caption text-text-secondary mt-1.5 leading-relaxed">{log.details}</p>
                  )}
                  <p className="text-micro text-text-muted mt-2">{formatDate(log.created_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
