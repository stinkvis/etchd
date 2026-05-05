import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Role = 'artist' | 'studio';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role>('artist');

  const isLast = step === 2;
  const cta = step === 0 ? 'START' : 'NEXT';

  const title = useMemo(() => {
    if (step === 0) return 'JOIN ETCHD';
    if (step === 1) return "LET’S SIGN UP..";
    return 'HOW ARE YOU JOINING?';
  }, [step]);

  const onNext = () => {
    if (step < 2) setStep((value) => value + 1);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.logo}>ETCHD</Text>
        <Text style={styles.close}>✕</Text>
      </View>

      <View style={styles.body}>
        {step === 0 && (
          <>
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.heroSubtitle}>For artists and studios ready to be discovered in Bali</Text>
            <Text style={styles.helper}>Create your profile, showcase your work and receive inquiries from serious clients..</Text>
          </>
        )}

        {step === 1 && (
          <>
            <Text style={styles.screenTitle}>{title}</Text>
            <Text style={styles.section}>HOW IT WORKS?</Text>
            <StepItem num="01" title="SIGN UP" body="Follow the guided registration process to provide your essential professional details and studio affiliation.." />
            <StepItem num="02" title="CREATE PROFILE AND PORTFOLIO" body="Build your professional profile and showcase your best work on your portfolio. GET DISCOVERED.." />
            <StepItem num="03" title="INQUIRIES & BOOKINGS" body="Once active, receive structured inquiries and booking through ETCHD.." />
          </>
        )}

        {isLast && (
          <>
            <Text style={styles.screenTitle}>{title}</Text>
            <Text style={styles.section}>CHOOSE THE PROFILE THAT FITS YOU BEST..</Text>

            <Pressable
              style={[styles.option, role === 'artist' ? styles.optionActive : styles.optionInactive]}
              onPress={() => setRole('artist')}>
              <Text style={[styles.optionText, role === 'artist' ? styles.optionTextActive : styles.optionTextInactive]}>
                TATTOO ARTIST
              </Text>
            </Pressable>
            <Pressable
              style={[styles.option, role === 'studio' ? styles.optionActive : styles.optionInactive]}
              onPress={() => setRole('studio')}>
              <Text style={[styles.optionText, role === 'studio' ? styles.optionTextActive : styles.optionTextInactive]}>
                TATTOO STUDIO
              </Text>
            </Pressable>

            <Text style={styles.helpTitle}>WHICH ONE FITS ME?</Text>
            <Text style={styles.helpHeader}>TATTOO ARTIST</Text>
            <Text style={styles.helpBody}>For independent artists or studio artists..</Text>
            <Text style={styles.helpHeader}>TATTOO STUDIO</Text>
            <Text style={styles.helpBody}>For studios with one or multiple artists..</Text>
          </>
        )}

        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>{cta}</Text>
        </Pressable>

        {step === 0 && (
          <Text style={styles.login}>Already have an account? <Text style={styles.loginAccent}>Log In</Text></Text>
        )}
      </View>

      <View style={styles.tabBar}>
        {['DISCOVER', 'SAVED', 'INQUIRIES', 'PROFILE'].map((item, idx) => (
          <Text key={item} style={[styles.tabLabel, idx === 3 && styles.tabActive]}>{item}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

function StepItem({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <View style={styles.stepRow}>
      <Text style={styles.stepNum}>{num}</Text>
      <View style={styles.stepTextWrap}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#020305' },
  header: { height: 64, borderBottomWidth: 1, borderBottomColor: '#14171a', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logo: { color: '#e8eaec', fontSize: 35/2, fontWeight: '700', letterSpacing: 0.8 },
  close: { color: '#d4d8dd', fontSize: 18 },
  body: { flex: 1, paddingHorizontal: 28, paddingTop: 34 },
  heroTitle: { color: '#fff', fontSize: 56/2, fontWeight: '800', marginTop: 240, textAlign: 'center' },
  heroSubtitle: { color: '#eceff3', fontSize: 34/2, textAlign: 'center', marginTop: 18, lineHeight: 26 },
  helper: { color: '#788088', fontSize: 10, textAlign: 'center', letterSpacing: 2, marginTop: 220 },
  screenTitle: { color: '#fff', fontSize: 52/2, fontWeight: '800', marginBottom: 36 },
  section: { color: '#8f98a3', fontSize: 30/2, letterSpacing: 4, fontWeight: '600', marginBottom: 24 },
  stepRow: { flexDirection: 'row', marginBottom: 28 },
  stepNum: { color: '#00828e', fontSize: 48/2, width: 64 },
  stepTextWrap: { flex: 1 },
  stepTitle: { color: '#d8dde3', fontSize: 42/2, letterSpacing: 1 },
  stepBody: { color: '#7d848b', fontSize: 16/1.8, lineHeight: 24, marginTop: 6 },
  option: { height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  optionActive: { backgroundColor: '#0f7076' },
  optionInactive: { borderWidth: 1, borderColor: '#0f7076' },
  optionText: { letterSpacing: 4, fontWeight: '700' },
  optionTextActive: { color: '#061114' },
  optionTextInactive: { color: '#0f97a4' },
  helpTitle: { color: '#0a8a95', fontSize: 12, marginTop: 30, marginBottom: 8 },
  helpHeader: { color: '#eef1f4', fontSize: 24/2, fontWeight: '700', marginTop: 10 },
  helpBody: { color: '#7a8086', fontSize: 16/1.8, marginTop: 4 },
  button: { marginTop: 'auto', backgroundColor: '#0f7076', height: 58, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  buttonText: { color: '#020d10', fontSize: 15, fontWeight: '800', letterSpacing: 4 },
  login: { color: '#dce0e4', textAlign: 'center', marginBottom: 12, fontSize: 14 },
  loginAccent: { color: '#078d97', fontWeight: '700' },
  tabBar: { borderTopWidth: 1, borderTopColor: '#14171a', height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 14 },
  tabLabel: { color: '#747c84', fontSize: 11, letterSpacing: 1.4 },
  tabActive: { color: '#04919d' },
});
