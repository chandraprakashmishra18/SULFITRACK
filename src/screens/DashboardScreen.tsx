import { WorkerTelemetry, ScreenId } from '../types';
import { WORKER_TELEMETRY_LIST, REFINERY_FACILITY } from '../data/mockData';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectWorker?: (workerId: string) => void;
  workers?: WorkerTelemetry[];
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onSelectWorker,
  workers = WORKER_TELEMETRY_LIST
}) => {
  const [searchWorker, setSearchWorker] = useState('');
  const [shiftFilter, setShiftFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showScanModal, setShowScanModal] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const handleExportCSV = () => {
    // Generate real CSV download
    const headers = ['Worker ID', 'Name', 'Role', 'Department', 'Gate Pass', 'Badge ID', 'Shift', 'Estimated Dose', 'Temp', 'Humidity', 'Status', 'Last Scan'];
    const rows = workers.map((w) => [
      w.workerId,
      `"${w.workerName}"`,
      `"${w.role}"`,
      `"${w.department}"`,
      w.gatePassNo,
      w.badgeId,
      `"${w.shift}"`,
      `"${w.estimatedDose}"`,
      w.temp,
      w.humidity,
      w.status,
      `"${w.lastScan}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MRPL_H2S_Dosimeter_Telemetry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  const filteredWorkers = workers.filter((w) => {
    const q = searchWorker.toLowerCase();
    const matchesSearch =
      w.workerName.toLowerCase().includes(q) ||
      w.badgeId.toLowerCase().includes(q) ||
      w.workerId.toLowerCase().includes(q) ||
      w.department.toLowerCase().includes(q);

    const matchesShift =
      shiftFilter === 'All' || w.shift.toLowerCase().includes(shiftFilter.toLowerCase());

    const matchesDept =
      departmentFilter === 'All' || w.department.toLowerCase().includes(departmentFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || w.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesShift && matchesDept && matchesStatus;
  });

  const handleViewWorker = (workerId: string) => {
    if (onSelectWorker) {
      onSelectWorker(workerId);
    }
    onNavigate('workers');
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn">
      {/* Top Summary / Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-slate-900 text-white p-5 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">
                {REFINERY_FACILITY.name} · Phase-III Block
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                OISD ACTIVE
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Live Shift B (Evening) Telemetry • {REFINERY_FACILITY.complianceStandard}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="dash-export-report-btn"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer active:scale-[0.98]"
            onClick={handleExportCSV}
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </button>

          <button
            id="dash-scan-badge-btn"
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-orange-950/20 transition-colors cursor-pointer active:scale-[0.98]"
            onClick={() => setShowScanModal(true)}
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>Scan Dosimeter</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="mb-4 p-4 bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2 border border-emerald-200 animate-fadeIn text-xs sm:text-sm font-medium">
          <span className="material-symbols-outlined text-emerald-600 text-[20px]">task_alt</span>
          <span>
            Official MRPL shift exposure telemetry file downloaded successfully (ISO-45001 / OISD audit compliant).
          </span>
        </div>
      )}

      {/* KPI Cards Grid Matching Design HTML */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Active Dosimeters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Active Dosimeters</div>
            <div className="text-3xl font-extrabold text-slate-900">142</div>
          </div>
          <div className="text-xs text-emerald-700 mt-2 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Syncing Across Units
          </div>
        </div>

        {/* Daily Avg Exposure */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Shift Avg Dose</div>
            <div className="text-3xl font-extrabold text-slate-900">
              0.42 <span className="text-base font-normal text-slate-500 font-mono">PPM·h</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2 font-mono">
            Below 8-hr TWA (1.0 PPM)
          </div>
        </div>

        {/* Attention Needed */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-amber-800 uppercase mb-1 tracking-wider">Elevated Doses</div>
            <div className="text-3xl font-extrabold text-amber-600">03</div>
          </div>
          <div className="text-xs text-amber-800 mt-2 font-medium">
            HCU-2, SRU-3, Flare Zone
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-red-600 p-5 rounded-2xl shadow-md text-white flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-red-100 uppercase mb-1 tracking-wider">Confined Space Critical</div>
            <div className="text-3xl font-extrabold text-white">01</div>
          </div>
          <div className="text-xs text-red-100 mt-2 font-bold animate-pulse">
            Deepak Sharma (Tank 3B: 14.8)
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Worker Exposure Trend */}
        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Refinery Exposure Trend</h3>
              <p className="text-xs text-slate-500">Last 7 days average PPM·h across Phase-III processing units</p>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono rounded text-xs font-semibold border border-slate-200">
              Daily TWA
            </span>
          </div>

          {/* Inline SVG Line Chart */}
          <div className="w-full h-48 flex items-end justify-between pt-6 pb-2 px-2 relative">
            <div className="absolute inset-x-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full h-[1px] bg-slate-400"></div>
              <div className="w-full h-[1px] bg-slate-400"></div>
              <div className="w-full h-[1px] bg-slate-400"></div>
            </div>

            <svg
              className="absolute inset-0 w-full h-full p-4 overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 300 120"
            >
              <path
                d="M 0,90 Q 50,70 100,50 T 200,60 T 300,30"
                fill="none"
                stroke="#ea580c"
                strokeWidth="3.5"
              ></path>
              <path
                d="M 0,90 Q 50,70 100,50 T 200,60 T 300,30 L 300,120 L 0,120 Z"
                fill="#ea580c"
                opacity="0.12"
              ></path>
            </svg>

            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="z-10 text-center flex flex-col items-center">
                <span className="font-mono text-slate-500 text-xs">{day}</span>
                <div className="w-2.5 h-2.5 rounded-full bg-orange-600 mt-1 shadow-sm ring-2 ring-white"></div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-slate-500 font-mono pt-3 text-xs border-t border-slate-100">
            <span>OISD Ceiling: 10.0 PPM·h</span>
            <span className="text-orange-600 font-bold">Plant Median: 1.8 PPM·h</span>
          </div>
        </div>

        {/* Exposure Distribution */}
        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Workforce Exposure Distribution</h3>
              <p className="text-xs text-slate-500">Active personnel dosage categorization</p>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono rounded text-xs font-semibold border border-slate-200">
              Shift B Status
            </span>
          </div>

          {/* Custom Progress Bars Breakdown */}
          <div className="flex flex-col gap-3.5 my-auto">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-800 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Normal (&lt;5 PPM·h)
                </span>
                <span className="text-slate-900 font-bold">128 workers (90%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-800 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Elevated (5-10 PPM·h)
                </span>
                <span className="text-slate-900 font-bold">3 workers (2%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-800 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  Critical (&gt;10 PPM·h)
                </span>
                <span className="text-slate-900 font-bold">1 worker (&lt;1%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-800 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  Standby / Off-Shift
                </span>
                <span className="text-slate-900 font-bold">10 workers (7%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-500 font-mono pt-3 text-xs border-t border-slate-100">
            <span>Monitored Units: 6 Blocks</span>
            <span className="text-slate-900 font-bold">100% Shift Compliance</span>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 flex-grow">
            {/* Search Worker */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-60">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[16px]">search</span>
              </span>
              <input
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 text-slate-900 text-xs rounded-lg border border-slate-300 outline-none focus:ring-1 focus:ring-orange-500 focus:bg-white transition-all"
                placeholder="Search worker, unit, or badge ID..."
                type="text"
                value={searchWorker}
                onChange={(e) => setSearchWorker(e.target.value)}
              />
            </div>

            {/* Filter Department / Unit */}
            <select
              className="px-3 py-1.5 bg-slate-50 text-slate-800 text-xs rounded-lg border border-slate-300 outline-none cursor-pointer"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="All">All Refinery Units</option>
              <option value="Hydrocracker">Hydrocracker (HCU-2)</option>
              <option value="Sulfur Recovery">Sulfur Recovery (SRU-3)</option>
              <option value="Amine">Amine Treating (ARU-04)</option>
              <option value="Coker">Delayed Coker (DCU)</option>
              <option value="Crude">Crude Distillation (CDU-1)</option>
              <option value="Tank Farm">Tank Farm & Flare Offsites</option>
            </select>

            {/* Filter Shift */}
            <select
              className="px-3 py-1.5 bg-slate-50 text-slate-800 text-xs rounded-lg border border-slate-300 outline-none cursor-pointer"
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
            >
              <option value="All">All Shifts</option>
              <option value="Shift A">Morning (Shift A)</option>
              <option value="Shift B">Evening (Shift B)</option>
              <option value="Shift C">Night (Shift C)</option>
              <option value="Shift G">General (Shift G)</option>
            </select>

            {/* Filter Status */}
            <select
              className="px-3 py-1.5 bg-slate-50 text-slate-800 text-xs rounded-lg border border-slate-300 outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Normal">Normal (&lt;5 PPM·h)</option>
              <option value="Elevated">Elevated (&gt;5 PPM·h)</option>
              <option value="Invalid">Offline / Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              onClick={() => {
                setSearchWorker('');
                setShiftFilter('All');
                setDepartmentFilter('All');
                setStatusFilter('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Worker Exposure Table - Live Exposure Feed */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Live Exposure Telemetry Registry</h2>
            <p className="text-xs text-slate-500">
              Shift-wise colorimetric dosimeter readings across plant units
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg text-xs font-semibold border border-slate-200">
              Showing {filteredWorkers.length} Personnel
            </span>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase sticky top-0">
              <tr>
                <th className="px-6 py-3.5">Worker Name</th>
                <th className="px-4 py-3.5">Department / Unit</th>
                <th className="px-4 py-3.5">Badge ID</th>
                <th className="px-4 py-3.5">Shift</th>
                <th className="px-4 py-3.5">Estimated Dose</th>
                <th className="px-4 py-3.5">Temp / RH</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Last Scan</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredWorkers.map((w) => {
                const isElevated = w.status === 'Elevated';
                return (
                  <tr
                    key={w.workerId}
                    className={`hover:bg-slate-50 transition-colors ${
                      isElevated ? 'bg-amber-50/30' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-3.5 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                            isElevated
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {w.workerId.replace('WRK-', '')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{w.workerName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{w.gatePassNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-700 font-medium">
                      {w.department}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-500 text-xs">{w.badgeId}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-700">{w.shift}</td>
                    <td
                      className={`px-4 py-3.5 font-mono text-xs font-bold ${
                        isElevated
                          ? 'text-amber-700 font-extrabold'
                          : w.status === 'Invalid'
                          ? 'text-slate-400'
                          : 'text-slate-900'
                      }`}
                    >
                      {w.estimatedDose}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-slate-600">
                      {w.temp} / {w.humidity}
                    </td>
                    <td className="px-4 py-3.5">
                      {w.status === 'Normal' && (
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                          NORMAL
                        </span>
                      )}
                      {w.status === 'Elevated' && (
                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                          WARNING
                        </span>
                      )}
                      {w.status === 'Invalid' && (
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                          OFFLINE
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 italic">{w.lastScan}</td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          isElevated
                            ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                        onClick={() => handleViewWorker(w.workerId)}
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-slate-50 text-slate-500 text-xs flex justify-between items-center border-t border-slate-200">
          <span>Showing {filteredWorkers.length} Registered Technicians • MRPL Safety Management</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-400">All shifts synchronized</span>
          </div>
        </div>
      </div>

      {/* Scan Badge Action Modal */}
      {showScanModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl relative border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Scan Dosimeter Wristband</h3>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                onClick={() => setShowScanModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="w-full h-48 bg-slate-50 rounded-xl flex flex-col items-center justify-center mb-4 border border-slate-200 relative overflow-hidden">
              <span className="material-symbols-outlined text-[48px] text-orange-600 mb-2 animate-bounce">
                qr_code_scanner
              </span>
              <span className="text-xs text-slate-600 font-medium">Align badge sensor array in viewfinder</span>
              <div className="absolute inset-x-0 h-0.5 bg-orange-500 animate-pulse top-1/2 shadow-[0_0_8px_#ea580c]"></div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="w-full py-2.5 bg-orange-600 text-white rounded-xl text-xs font-semibold hover:bg-orange-700 transition-colors shadow-sm cursor-pointer"
                onClick={() => {
                  setShowScanModal(false);
                  onNavigate('scan');
                }}
              >
                Launch Field Camera Scanner
              </button>
              <button
                className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                onClick={() => setShowScanModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
