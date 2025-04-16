export const exercises = {
  '1': [
    {
      id: '1-1',
      title: 'İlk Değişkeninizi Oluşturun',
      description: 'Bir değişken oluşturun ve değer atayın.',
      initialCode: '// "isim" adında bir değişken oluşturun ve kendi isminizi atayın\n\n// Değişkeni döndürün\nreturn isim;',
      expectedOutput: 'Değişken adınızı içermeli',
      hint: 'let isim = "Adınız"; şeklinde bir değişken oluşturabilirsiniz.',
      validator: (result) => {
        return typeof result === 'string' && result.length > 0;
      }
    },
    {
      id: '1-2',
      title: 'Sayılarla Çalışma',
      description: 'İki sayıyı toplayın ve sonucu döndürün.',
      initialCode: '// İki sayıyı toplayın ve sonucu döndürün\nlet sayi1 = 5;\nlet sayi2 = 7;\n\n// Toplamı hesaplayın ve döndürün\n',
      expectedOutput: 12,
      hint: 'İki sayıyı toplamak için + operatörünü kullanabilirsiniz: sayi1 + sayi2',
      validator: (result) => {
        return result === 12;
      }
    }
  ],
  '2': [
    {
      id: '2-1',
      title: 'Koşullu İfade Yazma',
      description: 'Bir sayının pozitif, negatif veya sıfır olduğunu kontrol eden bir koşul yazın.',
      initialCode: '// Bir sayının pozitif, negatif veya sıfır olduğunu kontrol eden bir fonksiyon yazın\nfunction sayiKontrol(sayi) {\n  // Kodunuzu buraya yazın\n  \n}\n\n// Test\nreturn sayiKontrol(5); // "Pozitif" döndürmeli',
      expectedOutput: 'Pozitif',
      hint: 'if, else if ve else ifadelerini kullanarak sayının durumunu kontrol edebilirsiniz.',
      validator: (result) => {
        return result === 'Pozitif';
      }
    },
    {
      id: '2-2',
      title: 'Fonksiyon Oluşturma',
      description: 'İki sayıyı çarpan bir fonksiyon yazın.',
      initialCode: '// İki sayıyı çarpan bir fonksiyon yazın\n\n// Fonksiyonu çağırın ve sonucu döndürün\nreturn carp(4, 3); // 12 döndürmeli',
      expectedOutput: 12,
      hint: 'function carp(a, b) { return a * b; } şeklinde bir fonksiyon yazabilirsiniz.',
      validator: (result) => {
        return result === 12;
      }
    }
  ],
  '3': [
    {
      id: '3-1',
      title: 'İlk React Native Bileşeni',
      description: 'Ekranda "Merhaba Dünya!" yazan basit bir React Native bileşeni oluşturun.',
      initialCode: '// Ekranda "Merhaba Dünya!" yazan bir bileşen oluşturun\n// Not: Bu kod gerçekten çalıştırılamaz, sadece sözdizimini öğrenmek için\n\n/*\nimport React from 'react';\nimport { Text, View } from 'react-native';\n\nfunction MerhabaDunya() {\n  // Kodunuzu buraya yazın\n  \n}\n\nexport default MerhabaDunya;\n*/\n\n// Doğru cevabı göstermek için aşağıdaki metni döndürün\nreturn "Bileşen oluşturuldu";',
      expectedOutput: 'Bileşen oluşturuldu',
      hint: 'View içinde bir Text bileşeni kullanarak metni gösterebilirsiniz.',
      validator: (result) => {
        return result === 'Bileşen oluşturuldu';
      }
    }
  ],
  '4': [
    {
      id: '4-1',
      title: 'Stil Oluşturma',
      description: 'Bir metin için stil oluşturun.',
      initialCode: '// Bir metin için stil oluşturun\n// Not: Bu kod gerçekten çalıştırılamaz, sadece sözdizimini öğrenmek için\n\n/*\nimport { StyleSheet } from \'react-native\';\n\nconst styles = StyleSheet.create({\n  // Kodunuzu buraya yazın\n  \n});\n*/\n\n// Doğru cevabı göstermek için aşağıdaki metni döndürün\nreturn "Stil oluşturuldu";',
      expectedOutput: 'Stil oluşturuldu',
      hint: 'StyleSheet.create içinde text adında bir stil oluşturup fontSize, color gibi özellikler ekleyebilirsiniz.',
      validator: (result) => {
        return result === 'Stil oluşturuldu';
      }
    }
  ],
  '5': [
    {
      id: '5-1',
      title: 'Sayaç Fonksiyonu',
      description: 'Sayaç değerini artıran bir fonksiyon yazın.',
      initialCode: '// useState kullanarak bir sayaç değerini artıran fonksiyon yazın\n// Not: Bu kod gerçekten çalıştırılamaz, sadece sözdizimini öğrenmek için\n\n/*\nimport React, { useState } from \'react\';\n\nfunction SayacArttir() {\n  const [sayac, setSayac] = useState(0);\n  \n  // Sayacı artıran fonksiyonu yazın\n  \n}\n*/\n\n// Doğru cevabı göstermek için aşağıdaki metni döndürün\nreturn "Fonksiyon yazıldı";',
      expectedOutput: 'Fonksiyon yazıldı',
      hint: 'setSayac(sayac + 1) şeklinde sayaç değerini artırabilirsiniz.',
      validator: (result) => {
        return result === 'Fonksiyon yazıldı';
      }
    }
  ]
};
