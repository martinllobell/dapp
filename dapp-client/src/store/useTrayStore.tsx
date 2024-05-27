import create from 'zustand';
import { persist } from 'zustand/middleware';

export type Bet = {
    id: string;  // Asegurarse de que cada Bet tenga un id único
    match: string;
    winCondition: string;
    team: string;
    gains: number;  // Cambiar a número para facilitar cálculos
};

interface TrayStore {
    totalGains: number;
    availableMoney: string;
    tray: Bet[];
}

export interface useTrayStore {
    store: TrayStore;
    setMoney: (money: string) => void;
    actualizeTray: (bet: Bet) => void;
    removeTray: (id: string) => void;
    removeTrays: () => void;
}

export const useTrayStore = create(
    persist<useTrayStore>(
        (set, get) => ({
            store: {
                totalGains: 0,
                availableMoney: '',
                tray: []
            },
            setMoney: (money) => {
                set((state) => ({
                    store: {
                        ...state.store,
                        availableMoney: money
                    }
                }));
            },
            actualizeTray: (bet) => {
                set((state) => {
                    const existingBetIndex = state.store.tray.findIndex((b) => b.id === bet.id);
                    let newTray;
                    if (existingBetIndex !== -1) {
                        // Actualizar el bet existente
                        newTray = state.store.tray.map((b, index) => index === existingBetIndex ? bet : b);
                    } else {
                        // Añadir un nuevo bet
                        newTray = [...state.store.tray, bet];
                    }
                    // Calcular totalGains
                    const totalGains = newTray.reduce((acc, b) => acc + b.gains, 0);

                    return {
                        store: {
                            ...state.store,
                            tray: newTray,
                            totalGains: totalGains
                        }
                    };
                });
            },
            removeTray: (id) => {
                set((state) => {
                    const newTray = state.store.tray.filter((b) => b.id !== id);
                    // Calcular totalGains
                    const totalGains = newTray.reduce((acc, b) => acc + b.gains, 0);
                    return {
                        store: {
                            ...state.store,
                            tray: newTray,
                            totalGains: totalGains
                        }
                    };
                });
            },
            removeTrays: () => {
                set((state) => {
                    return {
                        store: {
                            ...state.store,
                            tray: [],
                        }
                    };
                });
            }
        }),
        {
            name: "tray-storage"
        }
    )
);