'use client';

import { motion } from 'framer-motion';
import { Database, Search, Filter, Download, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

const DatabasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const mockData = [
    { id: 1, bin: '424242', brand: 'Visa', type: 'Credit', country: 'US', bank: 'Chase Bank' },
    { id: 2, bin: '555555', brand: 'Mastercard', type: 'Debit', country: 'CA', bank: 'RBC' },
    { id: 3, bin: '378282', brand: 'American Express', type: 'Credit', country: 'US', bank: 'Amex' },
    { id: 4, bin: '601111', brand: 'Discover', type: 'Credit', country: 'US', bank: 'Discover Bank' },
    { id: 5, bin: '411111', brand: 'Visa', type: 'Credit', country: 'UK', bank: 'Barclays' },
  ];

  const emptyTableData = [];

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === mockData.length 
        ? [] 
        : mockData.map(item => item.id)
    );
  };

  const DataTable = ({ data, title, isEmpty = false }: { data: any[], title: string, isEmpty?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-strong rounded-3xl p-6 lg:p-8 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-3">
          <button className="btn-secondary px-4 py-2 text-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn-primary px-4 py-2 text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>
      </div>

      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="w-24 h-24 mx-auto mb-6 rounded-3xl glass flex items-center justify-center"
          >
            <Database className="w-12 h-12 text-gray-400" />
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-2xl font-bold text-white mb-4"
          >
            No Data Available
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-gray-300 mb-8 max-w-md mx-auto"
          >
            This table is currently empty. Add some data to get started with your database management.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="btn-primary px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add First Entry
          </motion.button>
        </motion.div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-4 px-4 text-gray-300 font-semibold">BIN</th>
                <th className="text-left py-4 px-4 text-gray-300 font-semibold">Brand</th>
                <th className="text-left py-4 px-4 text-gray-300 font-semibold">Type</th>
                <th className="text-left py-4 px-4 text-gray-300 font-semibold">Country</th>
                <th className="text-left py-4 px-4 text-gray-300 font-semibold">Bank</th>
                <th className="text-left py-4 px-4 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono text-blue-400 font-semibold">{item.bin}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{item.brand}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'Credit' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{item.country}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{item.bank}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg glass hover:bg-white/10 transition-colors group">
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                      </button>
                      <button className="p-2 rounded-lg glass hover:bg-white/10 transition-colors group">
                        <Edit className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />
                      </button>
                      <button className="p-2 rounded-lg glass hover:bg-white/10 transition-colors group">
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl glass-strong flex items-center justify-center">
          <Database className="w-10 h-10 text-purple-400" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-black mb-4 gradient-text">
          Database Management
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Manage your BIN database with powerful tools and analytics
        </p>
      </motion.section>

      {/* Search Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-8"
      >
        <div className="glass rounded-2xl p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search BIN, brand, bank, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 pr-4"
            />
          </div>
        </div>
      </motion.section>

      {/* Tables */}
      <div className="space-y-12">
        <DataTable data={mockData} title="BIN Database - With Data" />
        <DataTable data={emptyTableData} title="BIN Database - Empty State" isEmpty={true} />
      </div>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Records', value: '125,847', color: 'from-blue-500 to-cyan-500' },
            { label: 'Verified BINs', value: '98,234', color: 'from-green-500 to-emerald-500' },
            { label: 'Countries', value: '195', color: 'from-purple-500 to-pink-500' },
            { label: 'Banks', value: '2,847', color: 'from-orange-500 to-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className="card text-center group hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default DatabasePage;