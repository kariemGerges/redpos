// 'use client';

// import React, {
//     createContext,
//     useContext,
//     useState,
//     useEffect,
//     ReactNode,
// } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getUserProfile, UserProfile } from '../services/api/auth';

// interface AuthLoginContextType {
//     user: UserProfile | null;
//     setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
//     loading: boolean;
// }

// const AuthLoginContext = createContext<AuthLoginContextType | undefined>(
//     undefined
// );

// interface AuthLoginProviderProps {
//     children: ReactNode;
// }

// export const AuthLoginProvider: React.FC<AuthLoginProviderProps> = ({
//     children,
// }) => {
//     const [user, setUser] = useState<UserProfile | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

// const { refetch } = useQuery({
//     queryKey: ['userProfile'],
//     queryFn: async () => {
//         const data = await getUserProfile();
//         return data;
//     },
//     retry: false,
//     enabled: false,
//     onSuccess: (data) => {
//         setUser(data);
//     },
//     onError: () => {
//         setUser(null);
//     },
// });

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const result = await refetch();
//                 setUser(result.data || null);
//             } catch (error) {
//                 console.error('Auth check error:', error);
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuth();
//     }, [refetch]);

//     return (
//         <AuthLoginContext.Provider value={{ user, setUser, loading }}>
//             {children}
//         </AuthLoginContext.Provider>
//     );
// };

// export const useLoginAuth = (): AuthLoginContextType => {
//     const context = useContext(AuthLoginContext);
//     if (context === undefined) {
//         throw new Error(
//             'useLoginAuth must be used within an AuthLoginProvider'
//         );
//     }
//     return context;
// };
