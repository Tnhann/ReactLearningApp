export const learningTopics = [
  {
    id: '1',
    title: 'Programlama Nedir?',
    description: 'Programlama kavramına giriş',
    icon: 'book-outline',
    content: `
# Programlama Nedir?

Programlama, bilgisayara ne yapması gerektiğini söyleme sanatıdır. Bilgisayarlar, kendilerine verilen talimatları adım adım takip ederler.

## Neden Programlama Öğrenmeliyiz?

- Kendi mobil uygulamalarınızı yapabilirsiniz
- Problem çözme becerilerinizi geliştirebilirsiniz
- Fikirlerinizi hayata geçirebilirsiniz
- Teknoloji dünyasında daha iyi fırsatlar elde edebilirsiniz

## Temel Programlama Kavramları

- **Değişkenler**: Bilgileri saklamak için kullanılır
- **Koşullar**: "Eğer bu doğruysa, şunu yap" gibi kararlar
- **Döngüler**: Bir işlemi tekrar tekrar yapmak için
- **Fonksiyonlar**: Tekrar kullanılabilir kod parçaları
    `,
  },
  {
    id: '2',
    title: 'JavaScript Temelleri',
    description: 'Programlama için JavaScript\'e giriş',
    icon: 'cube-outline',
    content: `
# JavaScript Temelleri

JavaScript, web ve mobil uygulamalar geliştirmek için kullanılan popüler bir programlama dilidir. React Native, JavaScript kullanarak mobil uygulamalar geliştirmenizi sağlar.

## Değişkenler

Değişkenler, bilgileri saklamak için kullanılır:

\`\`\`javascript
// Bir metin (string) değişkeni
let isim = "Ahmet";

// Bir sayı değişkeni
let yas = 25;

// Bir boolean (doğru/yanlış) değişkeni
let ogrenciMi = true;
\`\`\`

## Koşullar

Koşullar, programınızın farklı durumlarda farklı şeyler yapmasını sağlar:

\`\`\`javascript
let hava = "yağmurlu";

if (hava === "yağmurlu") {
  console.log("Şemsiye al!");
} else {
  console.log("Güneşli bir gün!");
}
\`\`\`

## Fonksiyonlar

Fonksiyonlar, tekrar kullanılabilir kod parçalarıdır:

\`\`\`javascript
// Fonksiyon tanımlama
function selamVer(isim) {
  return "Merhaba " + isim + "!";
}

// Fonksiyonu çağırma
let mesaj = selamVer("Ayşe");
console.log(mesaj); // "Merhaba Ayşe!" yazdırır
\`\`\`
    `,
  },
  {
    id: '3',
    title: 'React Native Nedir?',
    description: 'React Native ile mobil uygulama geliştirmeye giriş',
    icon: 'color-palette-outline',
    content: `
# React Native Nedir?

React Native, JavaScript kullanarak iOS ve Android için mobil uygulamalar geliştirmenizi sağlayan bir araçtır. Tek bir kod tabanı ile her iki platform için de uygulama geliştirebilirsiniz.

## React Native'in Avantajları

- Hem iOS hem de Android için tek kod yazabilirsiniz
- JavaScript bilgisiyle mobil uygulama geliştirebilirsiniz
- Değişiklikleri anında görebilirsiniz (Hot Reloading)
- Büyük bir topluluk desteği vardır

## İlk React Native Uygulaması

İşte basit bir "Merhaba Dünya" uygulaması:

\`\`\`javascript
import React from 'react';
import { Text, View } from 'react-native';

function MerhabaDunya() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Merhaba Dünya!</Text>
    </View>
  );
}

export default MerhabaDunya;
\`\`\`

Bu kod:
1. React ve React Native'den gerekli parçaları içe aktarır
2. MerhabaDunya adında bir fonksiyon bileşeni oluşturur
3. Ekranda "Merhaba Dünya!" yazısını gösterir
    `,
  },
  {
    id: '4',
    title: 'Temel Bileşenler',
    description: 'React Native\'in temel yapı taşları',
    icon: 'sync-outline',
    content: `
# Temel Bileşenler

React Native'de uygulamalar, bileşenlerden (components) oluşur. İşte en temel bileşenler:

## Text - Metin Gösterme

\`\`\`javascript
import React from 'react';
import { Text, View } from 'react-native';

function MetinOrnegi() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Bu bir metin örneğidir</Text>
      <Text style={{ fontSize: 20, color: 'blue' }}>Bu mavi ve büyük bir metindir</Text>
    </View>
  );
}
\`\`\`

## Button - Düğme

\`\`\`javascript
import React from 'react';
import { Button, View, Alert } from 'react-native';

function DugmeOrnegi() {
  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Bana Tıkla"
        onPress={() => Alert.alert('Merhaba', 'Düğmeye tıkladınız!')}
      />
    </View>
  );
}
\`\`\`

## Image - Resim Gösterme

\`\`\`javascript
import React from 'react';
import { Image, View } from 'react-native';

function ResimOrnegi() {
  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
\`\`\`
    `,
  },
  {
    id: '5',
    title: 'Basit Bir Uygulama Yapalım',
    description: 'Adım adım ilk uygulamanızı oluşturun',
    icon: 'navigate-outline',
    content: `
# Basit Bir Uygulama Yapalım

Şimdi öğrendiklerimizi kullanarak basit bir sayaç uygulaması yapalım.

## Sayaç Uygulaması

\`\`\`javascript
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function SayacUygulamasi() {
  // useState ile bir sayaç değişkeni oluşturuyoruz
  const [sayac, setSayac] = useState(0);

  // Sayaçı artıran fonksiyon
  const sayaciArtir = () => {
    setSayac(sayac + 1);
  };

  // Sayaçı azaltan fonksiyon
  const sayaciAzalt = () => {
    setSayac(sayac - 1);
  };

  // Sayaçı sıfırlayan fonksiyon
  const sayaciSifirla = () => {
    setSayac(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Sayaç Uygulaması</Text>

      <Text style={styles.sayac}>{sayac}</Text>

      <View style={styles.butonlar}>
        <Button title="Artır" onPress={sayaciArtir} />
        <Button title="Azalt" onPress={sayaciAzalt} />
        <Button title="Sıfırla" onPress={sayaciSifirla} />
      </View>
    </View>
  );
}

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  baslik: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sayac: {
    fontSize: 48,
    marginBottom: 20,
  },
  butonlar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default SayacUygulamasi;
\`\`\`

## Bu Uygulamada Neler Öğrendik?

1. **useState** ile değişken oluşturmayı
2. **Fonksiyonlar** tanımlamayı ve kullanmayı
3. **Butonlar** ile etkileşim sağlamayı
4. **StyleSheet** ile stil tanımlamayı
    `,
  },
  {
    id: '6',
    title: 'Sonraki Adımlar',
    description: 'React Native öğrenmeye devam etmek için kaynaklar',
    icon: 'cloud-download-outline',
    content: `
# Sonraki Adımlar

Tebrikler! React Native'in temellerini öğrenmeye başladınız. İşte öğrenmeye devam etmek için bazı kaynaklar ve fikirler:

## Öğrenebileceğiniz Diğer Konular

- **Navigasyon**: Uygulamanızda farklı sayfalar arasında geçiş yapma
- **Form Elemanları**: TextInput, Switch, Checkbox gibi kullanıcı giriş elemanları
- **Liste Gösterimi**: FlatList ve ScrollView ile uzun içerikler gösterme
- **Depolama**: AsyncStorage ile veri saklama
- **API İstekleri**: İnternetten veri çekme ve gönderme

## Yapabileceğiniz Örnek Projeler

1. **Yapılacaklar Listesi**: Görevleri ekleyip, tamamlayıp, silebileceğiniz bir uygulama
2. **Hava Durumu Uygulaması**: Hava durumu API'sinden veri çeken bir uygulama
3. **Not Defteri**: Notlar oluşturup kaydedebileceğiniz bir uygulama
4. **Basit Oyun**: Taş-Kağıt-Makas gibi basit bir oyun

## Faydalı Kaynaklar

- [React Native Resmi Dokümantasyonu](https://reactnative.dev/docs/getting-started)
- [Expo Dokümantasyonu](https://docs.expo.dev/)
- [React Native Örnekleri](https://reactnative.dev/docs/tutorial)
- [YouTube Eğitim Videoları](https://www.youtube.com/results?search_query=react+native+tutorial+for+beginners)

## Unutmayın

Programlama öğrenmek bir maraton, sprint değil. Küçük adımlarla ilerleyin, bol bol pratik yapın ve hatalardan öğrenin. Başarılar!
    `,
  },
];
