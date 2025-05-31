import React from 'react';
import { MessageSquare, FileText, Book } from 'lucide-react';

// Sample recent activity data
const activities = [
  {
    id: 1,
    type: 'conversation',
    title: 'Practice Conversation',
    description: 'You practiced conversation starters with your coach.',
    time: '2 hours ago',
    icon: <MessageSquare className="h-5 w-5 text-primary-600" />
  },
  {
    id: 2,
    type: 'report',
    title: 'Performance Report Updated',
    description: 'Your dating skills report was updated based on recent activity.',
    time: '1 day ago',
    icon: <FileText className="h-5 w-5 text-secondary-600" />
  },
  {
    id: 3,
    type: 'lesson',
    title: 'Completed Confidence Lesson',
    description: 'You completed a lesson on building dating confidence.',
    time: '3 days ago',
    icon: <Book className="h-5 w-5 text-accent-600" />
  }
];

const RecentActivity: React.FC = () => {
  return (
    <div className="space-y-4">
      {activities.length > 0 ? (
        <div className="divide-y divide-neutral-100">
          {activities.map((activity) => (
            <div key={activity.id} className="py-4 flex">
              <div className="mr-4">
                <div className="h-10 w-10 rounded-full bg-neutral-50 flex items-center justify-center">
                  {activity.icon}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-900">{activity.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{activity.description}</p>
                <p className="mt-1 text-xs text-neutral-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-neutral-500">No recent activity yet.</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;