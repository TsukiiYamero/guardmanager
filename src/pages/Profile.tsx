import React from 'react';
import {UserSettings} from '@/components/settings/UserSettings';
import { MainLayout } from '@/layouts/MainLayout';

const Profile: React.FC = () => {

    const isAuthenticated = Boolean(localStorage.getItem('token'));

    if (!isAuthenticated) {
        return <p>No estás autenticado</p>; 
    }

    return (
        <MainLayout>
        <div className="settings-page">
            <h1>Página de Configuración</h1>
            <UserSettings />
        </div>
        </MainLayout>
    );
};

export default Profile