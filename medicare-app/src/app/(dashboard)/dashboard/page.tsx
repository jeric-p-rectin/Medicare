import { Metadata } from 'next';
import { Users, Package, Calendar, TrendingUp, Bell, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dashboard | MED-Alert',
  description: 'MED-Alert Dashboard - Healthcare Management System',
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to MED-Alert Health Center Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          className="border-0"
          style={{ boxShadow: '0 4px 12px rgba(196, 30, 58, 0.05)', borderLeft: '4px solid #C41E3A' }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
            >
              <Users className="w-5 h-5" style={{ color: '#C41E3A' }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#263238' }}>0</div>
            <p className="text-xs text-gray-500">Registered patients</p>
          </CardContent>
        </Card>

        <Card
          className="border-0"
          style={{ boxShadow: '0 4px 12px rgba(196, 30, 58, 0.05)', borderLeft: '4px solid #E63946' }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Appointments</CardTitle>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
            >
              <Calendar className="w-5 h-5" style={{ color: '#E63946' }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#263238' }}>0</div>
            <p className="text-xs text-gray-500">Scheduled for today</p>
          </CardContent>
        </Card>

        <Card
          className="border-0"
          style={{ boxShadow: '0 4px 12px rgba(196, 30, 58, 0.05)', borderLeft: '4px solid #C41E3A' }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
            >
              <Package className="w-5 h-5" style={{ color: '#C41E3A' }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#263238' }}>0</div>
            <p className="text-xs text-gray-500">Need restocking</p>
          </CardContent>
        </Card>

        <Card
          className="border-0"
          style={{ boxShadow: '0 4px 12px rgba(196, 30, 58, 0.05)', borderLeft: '4px solid #E63946' }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Disease Cases</CardTitle>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: '#E63946' }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#263238' }}>0</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0" style={{ boxShadow: '0 4px 12px rgba(196, 30, 58, 0.05)' }}>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md hover:bg-red-50">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
                >
                  <Users className="w-5 h-5" style={{ color: '#C41E3A' }} />
                </div>
                <p className="font-medium text-gray-800">Register Student</p>
                <p className="text-sm text-gray-500">Add new student</p>
              </button>

              <button className="p-4 text-left rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md hover:bg-red-50">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
                >
                  <Calendar className="w-5 h-5" style={{ color: '#E63946' }} />
                </div>
                <p className="font-medium text-gray-800">Schedule</p>
                <p className="text-sm text-gray-500">Book appointment</p>
              </button>

              <button className="p-4 text-left rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md hover:bg-red-50">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
                >
                  <Package className="w-5 h-5" style={{ color: '#C41E3A' }} />
                </div>
                <p className="font-medium text-gray-800">Inventory</p>
                <p className="text-sm text-gray-500">Manage stock</p>
              </button>

              <button className="p-4 text-left rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md hover:bg-red-50">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)' }}
                >
                  <TrendingUp className="w-5 h-5" style={{ color: '#E63946' }} />
                </div>
                <p className="font-medium text-gray-800">Reports</p>
                <p className="text-sm text-gray-500">View analytics</p>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0" style={{ boxShadow: '0 4px 12px rgba(196, 30, 58, 0.05)' }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" style={{ color: '#C41E3A' }} />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No alerts at this time</p>
              <p className="text-sm">System alerts will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Notice */}
      <Card
        className="mt-6 border-0"
        style={{
          background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.05) 0%, rgba(230, 57, 70, 0.05) 100%)',
          boxShadow: '0 4px 12px rgba(196, 30, 58, 0.05)',
        }}
      >
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)' }}
            >
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium" style={{ color: '#C41E3A' }}>
                System Setup Complete
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Week 1 and Week 2 implementation is complete. The system includes authentication,
                database schema, and core infrastructure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
