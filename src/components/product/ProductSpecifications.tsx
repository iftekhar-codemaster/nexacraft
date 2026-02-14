interface Specification {
  name: string
  value: string
}

interface ProductSpecificationsProps {
  specifications: Specification[]
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specifications.map((spec, index) => (
          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
            <span className="font-medium text-gray-700">{spec.name}</span>
            <span className="text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Size Guide */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Size Guide</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2 px-4 font-medium text-gray-700">Size</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Chest (inches)</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Length (inches)</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Sleeve (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">XS</td>
                <td className="py-2 px-4">32-34</td>
                <td className="py-2 px-4">26</td>
                <td className="py-2 px-4">7.5</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">S</td>
                <td className="py-2 px-4">34-36</td>
                <td className="py-2 px-4">27</td>
                <td className="py-2 px-4">8</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">M</td>
                <td className="py-2 px-4">38-40</td>
                <td className="py-2 px-4">28</td>
                <td className="py-2 px-4">8.5</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">L</td>
                <td className="py-2 px-4">42-44</td>
                <td className="py-2 px-4">29</td>
                <td className="py-2 px-4">9</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">XL</td>
                <td className="py-2 px-4">46-48</td>
                <td className="py-2 px-4">30</td>
                <td className="py-2 px-4">9.5</td>
              </tr>
              <tr>
                <td className="py-2 px-4">2XL</td>
                <td className="py-2 px-4">50-52</td>
                <td className="py-2 px-4">31</td>
                <td className="py-2 px-4">10</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Measurements are approximate and may vary slightly. For the best fit, we recommend measuring a similar garment you own.
        </p>
      </div>
    </div>
  )
}