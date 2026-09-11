import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import type { SiteConfig, ServicePortfolioConfig } from '../utils/store';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom databaseId if configured
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Types
export interface ContactInquiry {
  id?: string;
  nombre: string;
  organizacion?: string;
  email: string;
  telefono?: string;
  servicio: string;
  mensaje: string;
  status: 'nuevo' | 'en_proceso' | 'atendido' | 'archivado';
  createdAt?: any;
}

// Site Config Firestore Operations
const SITE_CONFIG_DOC = 'general';
const SITE_CONFIG_COLLECTION = 'site_config';

export const saveSiteConfigToFirestore = async (config: SiteConfig): Promise<void> => {
  try {
    const docRef = doc(db, SITE_CONFIG_COLLECTION, SITE_CONFIG_DOC);
    await setDoc(docRef, {
      ...config,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn('Firestore saveSiteConfig error (fallback to local):', error);
  }
};

export const getSiteConfigFromFirestore = async (): Promise<Partial<SiteConfig> | null> => {
  try {
    const docRef = doc(db, SITE_CONFIG_COLLECTION, SITE_CONFIG_DOC);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as Partial<SiteConfig>;
    }
    return null;
  } catch (error) {
    console.warn('Firestore getSiteConfig error:', error);
    return null;
  }
};

export const subscribeSiteConfig = (callback: (config: Partial<SiteConfig>) => void): Unsubscribe => {
  try {
    const docRef = doc(db, SITE_CONFIG_COLLECTION, SITE_CONFIG_DOC);
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.data() as Partial<SiteConfig>);
        }
      },
      (error) => {
        console.warn('Firestore subscribeSiteConfig snapshot listener error:', error);
      }
    );
  } catch (error) {
    console.warn('Firestore subscribeSiteConfig initial error:', error);
    return () => {};
  }
};

// Portfolio Config Firestore Operations
const PORTFOLIO_CONFIG_DOC = 'services_matrix';
const PORTFOLIO_CONFIG_COLLECTION = 'portfolio_config';

export const savePortfolioConfigToFirestore = async (config: Record<string, ServicePortfolioConfig>): Promise<void> => {
  try {
    const docRef = doc(db, PORTFOLIO_CONFIG_COLLECTION, PORTFOLIO_CONFIG_DOC);
    await setDoc(docRef, {
      services: config,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn('Firestore savePortfolioConfig error:', error);
  }
};

export const getPortfolioConfigFromFirestore = async (): Promise<Record<string, ServicePortfolioConfig> | null> => {
  try {
    const docRef = doc(db, PORTFOLIO_CONFIG_COLLECTION, PORTFOLIO_CONFIG_DOC);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return data?.services || null;
    }
    return null;
  } catch (error) {
    console.warn('Firestore getPortfolioConfig error:', error);
    return null;
  }
};

export const subscribePortfolioConfig = (callback: (config: Record<string, ServicePortfolioConfig>) => void): Unsubscribe => {
  try {
    const docRef = doc(db, PORTFOLIO_CONFIG_COLLECTION, PORTFOLIO_CONFIG_DOC);
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.services) {
            callback(data.services);
          }
        }
      },
      (error) => {
        console.warn('Firestore subscribePortfolioConfig snapshot listener error:', error);
      }
    );
  } catch (error) {
    console.warn('Firestore subscribePortfolioConfig initial error:', error);
    return () => {};
  }
};

// Inquiries Operations
const INQUIRIES_COLLECTION = 'inquiries';

export const submitInquiryToFirestore = async (inquiryData: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>): Promise<string> => {
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    const res = await addDoc(colRef, {
      ...inquiryData,
      status: 'nuevo',
      createdAt: serverTimestamp()
    });
    return res.id;
  } catch (error) {
    console.error('Error submitting inquiry to Firestore:', error);
    throw error;
  }
};

export const subscribeInquiries = (callback: (inquiries: ContactInquiry[]) => void): Unsubscribe => {
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: ContactInquiry[] = [];
        snapshot.forEach((docSnap) => {
          list.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<ContactInquiry, 'id'>)
          });
        });
        callback(list);
      },
      (error) => {
        console.warn('Firestore subscribeInquiries snapshot listener error:', error);
      }
    );
  } catch (error) {
    console.warn('Firestore subscribeInquiries initial error:', error);
    return () => {};
  }
};

export const updateInquiryStatusInFirestore = async (inquiryId: string, status: ContactInquiry['status']): Promise<void> => {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, inquiryId);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    throw error;
  }
};

export const deleteInquiryFromFirestore = async (inquiryId: string): Promise<void> => {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, inquiryId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    throw error;
  }
};
