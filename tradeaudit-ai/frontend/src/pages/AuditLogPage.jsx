import { useEffect } from 'react';
import { useTrades } from '../context/TradeContext';
import { formatDate } from '../utils/helpers';
import { FileText, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuditLogPage() {
  const { auditLogs, fetchAuditLogs } = useTrades();

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Audit Log</h1>
        <span className="text-sm text-gray-500">{auditLogs.length} entries</span>
      </div>

      {auditLogs.length === 0 ? (
        <div className="card text-center py-12">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No audit entries yet</p>
          <p className="text-sm text-gray-400 mt-1">Actions like trade analysis and chat queries will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {auditLogs.map(log => (
            <div key={log.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{log.action}</span>
                    {log.risk_score && (
                      <span className={`badge-${log.risk_category || 'medium'}`}>
                        Risk: {log.risk_score}/10
                      </span>
                    )}
                  </div>
                  {log.details && (
                    <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">{formatDate(log.created_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
