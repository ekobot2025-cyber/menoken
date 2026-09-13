import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { MarketPublic } from './pages/MarketPublic';
import { PartnerInvestorHub } from './pages/PartnerInvestorHub';
import { GroupPublicProfile } from './pages/GroupPublicProfile';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyGroupProfile } from './pages/student/MyGroupProfile';
import { ProposalForm } from './pages/student/ProposalForm';
import { ProductManager } from './pages/student/ProductManager';
import { PosCashier } from './pages/student/PosCashier';
import { RevenueTracker } from './pages/student/RevenueTracker';
import { ImpactStory } from './pages/student/ImpactStory';
import { LogbookMbkm } from './pages/student/LogbookMbkm';

// Reviewer Pages
import { ReviewerDashboard } from './pages/reviewer/ReviewerDashboard';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminProposals } from './pages/admin/AdminProposals';
import { AdminRanking } from './pages/admin/AdminRanking';
import { AdminVerification } from './pages/admin/AdminVerification';
import { AdminFunding } from './pages/admin/AdminFunding';
import { AdminMentoringTraining } from './pages/admin/AdminMentoringTraining';

// Leadership & Superadmin Pages
import { ExecutiveDashboard } from './pages/leadership/ExecutiveDashboard';
import { MasterData } from './pages/admin/MasterData';
import { AuditLogs } from './pages/admin/AuditLogs';

const AppContent = () => {
  const { role, user } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // Default to landing page on initial visit
    const currentTab = localStorage.getItem('menoken_active_tab');
    if (currentTab) return currentTab;
    return 'landing';
  });

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('menoken_active_tab', tab);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={handleSetActiveTab} />;
      case 'login':
        return <LandingPage setActiveTab={handleSetActiveTab} />;
      case 'market':
        return <MarketPublic />;
      case 'partner_hub':
        return <PartnerInvestorHub />;
      case 'group_public_profile':
        return <GroupPublicProfile setActiveTab={handleSetActiveTab} />;

      // Student views
      case 'student_dashboard':
        return <StudentDashboard setActiveTab={handleSetActiveTab} />;
      case 'student_profile':
        return <MyGroupProfile />;
      case 'student_proposal':
        return <ProposalForm />;
      case 'student_products':
        return <ProductManager />;
      case 'student_pos':
        return <PosCashier />;
      case 'student_revenue':
        return <RevenueTracker />;
      case 'student_impact':
        return <ImpactStory />;
      case 'student_logbook':
        return <LogbookMbkm />;

      // Reviewer views
      case 'reviewer_dashboard':
        return <ReviewerDashboard />;

      // Admin views
      case 'admin_dashboard':
        return <AdminDashboard setActiveTab={handleSetActiveTab} />;
      case 'admin_programs':
        return <AdminPrograms />;
      case 'admin_proposals':
        return <AdminProposals />;
      case 'admin_ranking':
        return <AdminRanking />;
      case 'admin_verification':
        return <AdminVerification />;
      case 'admin_funding':
        return <AdminFunding />;
      case 'admin_mentoring':
        return <AdminMentoringTraining />;

      // Leadership & Superadmin views
      case 'leadership_dashboard':
        return <ExecutiveDashboard />;
      case 'admin_master':
        return <MasterData />;
      case 'admin_audit':
        return <AuditLogs />;

      default:
        return <LandingPage setActiveTab={handleSetActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleSetActiveTab}>
      {renderActiveView()}
    </Layout>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
