import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export type BlockPoint = {
  block: number
  transactions: number
}

type Props = {
  data: BlockPoint[]
}

export function BlockChart({ data }: Props) {
  return (
    <div className="bg-gray-900 rounded-xl p6 border border-gray-800 mt-6 p-2 py-4">
      <h2 className="text-lg font-semibold text-gray-300 mb-4 px-8 py-2">
        Transaktionen pro Block
      </h2>
      <div className="p-2">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis
              dataKey="block"
              stroke="#aeb1b8ff"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
              tickFormatter={(value) => `#${String(value).slice(-3)}`}
            />
            <YAxis
              stroke="#aeb1b8ff"
              tick={{ fontSize: 12 }}
              allowDecimals={false}
              
              width={30}
              domain={[0, 'auto']}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
              }}
              labelStyle={{ color: '#f9fafb' }}
            />
            <Line
              type="monotone"
              dataKey="transactions"
              stroke="#f472b6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BlockChart
