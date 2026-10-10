"use client"

export default function ChartRenderer({ data }: { data: any }) {
  if (!data || !data.headers || !data.rows) {
     return (
       <div className="bg-gray-50 p-4 rounded-xl overflow-x-auto">
         <pre className="text-xs font-mono text-gray-500">{JSON.stringify(data, null, 2)}</pre>
       </div>
     )
  }

  return (
    <div className="w-full mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
       <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col gap-1">
          <h4 className="font-black text-gray-800 text-lg">{data.title || "Dữ liệu thống kê"}</h4>
          {(data.unit || data.kind) && (
             <span className="text-sm font-bold text-gray-500">
               {data.kind ? `Loại biểu đồ: ${data.kind.toUpperCase()}` : ''} {data.unit ? `| Đơn vị: ${data.unit}` : ''}
             </span>
          )}
       </div>
       
       <div className="overflow-x-auto">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                 {data.headers.map((h: string, i: number) => (
                    <th key={i} className="p-4 font-black text-gray-700 bg-gray-100/50 border-b border-gray-200 whitespace-nowrap">
                      {h || "Hạng mục"}
                    </th>
                 ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row: any[], i: number) => (
                 <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                    {row.map((cell: any, j: number) => (
                       <td key={j} className={`p-4 border-b border-gray-100 ${j === 0 ? 'font-bold text-gray-800 bg-gray-50/30' : 'text-gray-600 font-medium'}`}>
                         {cell}
                       </td>
                    ))}
                 </tr>
              ))}
            </tbody>
         </table>
       </div>
    </div>
  )
}
