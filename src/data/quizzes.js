export const quizzes = {
  '1': {
    title: 'Programlama Temelleri Quiz',
    questions: [
      {
        question: 'Programlama nedir?',
        answers: [
          'Bilgisayara ne yapması gerektiğini söyleme sanatı',
          'Bilgisayar donanımı tasarlama süreci',
          'Sadece web siteleri oluşturma işlemi',
          'Sadece oyun geliştirme süreci'
        ],
        correctAnswerIndex: 0,
        explanation: 'Programlama, bilgisayara belirli görevleri yerine getirmesi için talimatlar verme sanatıdır.'
      },
      {
        question: 'Aşağıdakilerden hangisi bir değişken türü değildir?',
        answers: [
          'String',
          'Number',
          'Boolean',
          'Command'
        ],
        correctAnswerIndex: 3,
        explanation: 'JavaScript\'te temel değişken türleri String, Number, Boolean, Object, Undefined ve Null\'dur. Command bir değişken türü değildir.'
      },
      {
        question: 'Aşağıdaki kodun çıktısı nedir?\nlet x = 5;\nlet y = 3;\nconsole.log(x + y);',
        answers: [
          '8',
          '53',
          '2',
          '15'
        ],
        correctAnswerIndex: 0,
        explanation: 'x (5) ve y (3) sayısal değerlerdir, toplandıklarında sonuç 8 olur.'
      }
    ]
  },
  '2': {
    title: 'JavaScript Temelleri Quiz',
    questions: [
      {
        question: 'JavaScript\'te bir fonksiyon nasıl tanımlanır?',
        answers: [
          'function myFunction() {}',
          'def myFunction() {}',
          'void myFunction() {}',
          'func myFunction() {}'
        ],
        correctAnswerIndex: 0,
        explanation: 'JavaScript\'te fonksiyonlar "function" anahtar kelimesi ile tanımlanır.'
      },
      {
        question: 'Aşağıdaki ifadelerden hangisi doğrudur?',
        answers: [
          'JavaScript, sadece web tarayıcılarında çalışır',
          'JavaScript, nesne yönelimli bir programlama dili değildir',
          'JavaScript, hem istemci hem de sunucu tarafında çalışabilir',
          'JavaScript, derlenen bir dildir'
        ],
        correctAnswerIndex: 2,
        explanation: 'JavaScript hem tarayıcılarda (istemci tarafı) hem de Node.js gibi ortamlarda (sunucu tarafı) çalışabilir.'
      },
      {
        question: 'Aşağıdaki kod ne yapar?\nlet isim = "Ahmet";\nif (isim === "Ahmet") {\n  console.log("Merhaba Ahmet!");\n} else {\n  console.log("Sen kimsin?");\n}',
        answers: [
          'Her zaman "Merhaba Ahmet!" yazdırır',
          'Her zaman "Sen kimsin?" yazdırır',
          'isim değişkeninin değerine bağlı olarak farklı mesajlar yazdırır',
          'Hata verir'
        ],
        correctAnswerIndex: 0,
        explanation: 'isim değişkeni "Ahmet" değerine sahip olduğu için, if koşulu doğru olacak ve "Merhaba Ahmet!" yazdırılacaktır.'
      }
    ]
  },
  '3': {
    title: 'React Native Temelleri Quiz',
    questions: [
      {
        question: 'React Native nedir?',
        answers: [
          'Sadece iOS uygulamaları geliştirmek için kullanılan bir framework',
          'Sadece Android uygulamaları geliştirmek için kullanılan bir framework',
          'JavaScript kullanarak iOS ve Android için native mobil uygulamalar geliştirmeyi sağlayan bir framework',
          'Web siteleri geliştirmek için kullanılan bir framework'
        ],
        correctAnswerIndex: 2,
        explanation: 'React Native, JavaScript kullanarak hem iOS hem de Android platformları için native mobil uygulamalar geliştirmenizi sağlayan bir framework\'tür.'
      },
      {
        question: 'React Native\'in avantajlarından biri değildir?',
        answers: [
          'Tek kod tabanı ile birden fazla platform için uygulama geliştirme',
          'JavaScript bilgisiyle mobil uygulama geliştirme',
          'Native performans',
          'Tüm native özelliklere doğrudan erişim'
        ],
        correctAnswerIndex: 3,
        explanation: 'React Native, birçok native özelliğe erişim sağlar, ancak bazı özel native özelliklere erişmek için ek modüller veya native kod yazmanız gerekebilir.'
      },
      {
        question: 'React Native\'de ekranda metin göstermek için hangi bileşen kullanılır?',
        answers: [
          '<p>',
          '<div>',
          '<Text>',
          '<span>'
        ],
        correctAnswerIndex: 2,
        explanation: 'React Native\'de metin göstermek için <Text> bileşeni kullanılır. Web\'deki <p>, <div> veya <span> gibi HTML etiketleri React Native\'de kullanılmaz.'
      }
    ]
  },
  '4': {
    title: 'React Native Bileşenleri Quiz',
    questions: [
      {
        question: 'Aşağıdakilerden hangisi React Native\'de bir container bileşenidir?',
        answers: [
          '<Text>',
          '<View>',
          '<Button>',
          '<Image>'
        ],
        correctAnswerIndex: 1,
        explanation: '<View> bileşeni, React Native\'de diğer bileşenleri içinde barındırabilen bir container bileşenidir, HTML\'deki <div> etiketine benzer.'
      },
      {
        question: 'React Native\'de kullanıcı girişi almak için hangi bileşen kullanılır?',
        answers: [
          '<Input>',
          '<TextField>',
          '<TextInput>',
          '<Form>'
        ],
        correctAnswerIndex: 2,
        explanation: 'React Native\'de kullanıcı girişi almak için <TextInput> bileşeni kullanılır.'
      },
      {
        question: 'React Native\'de stil tanımlamak için hangi API kullanılır?',
        answers: [
          'CSS',
          'SCSS',
          'StyleSheet',
          'Styled-components'
        ],
        correctAnswerIndex: 2,
        explanation: 'React Native\'de stil tanımlamak için StyleSheet API\'si kullanılır. Web\'deki CSS\'e benzer ancak JavaScript nesneleri olarak tanımlanır.'
      }
    ]
  },
  '5': {
    title: 'React Native Uygulama Geliştirme Quiz',
    questions: [
      {
        question: 'React Native\'de state yönetimi için hangi hook kullanılır?',
        answers: [
          'useEffect',
          'useState',
          'useContext',
          'useReducer'
        ],
        correctAnswerIndex: 1,
        explanation: 'React Native\'de (ve React\'te) bileşen içi durum yönetimi için useState hook\'u kullanılır.'
      },
      {
        question: 'Aşağıdaki kodun amacı nedir?\nconst [sayac, setSayac] = useState(0);',
        answers: [
          'Bir array oluşturmak',
          'Bir obje oluşturmak',
          'Bir state değişkeni ve onu güncelleyen fonksiyon oluşturmak',
          'Bir ref oluşturmak'
        ],
        correctAnswerIndex: 2,
        explanation: 'Bu kod, useState hook\'u kullanarak sayac adında bir state değişkeni ve setSayac adında bu değişkeni güncelleyen bir fonksiyon oluşturur.'
      },
      {
        question: 'React Native uygulamasını test etmek için en kolay yol nedir?',
        answers: [
          'Sadece emülatör kullanmak',
          'Sadece fiziksel cihaz kullanmak',
          'Expo Go uygulaması kullanmak',
          'Web tarayıcısında test etmek'
        ],
        correctAnswerIndex: 2,
        explanation: 'Expo Go uygulaması, React Native uygulamalarını hızlı bir şekilde test etmenin en kolay yoludur. QR kodu tarayarak uygulamanızı fiziksel cihazınızda anında görebilirsiniz.'
      }
    ]
  },
  '6': {
    title: 'İleri Seviye React Native Quiz',
    questions: [
      {
        question: 'React Native uygulamasında sayfalar arası geçiş için hangi kütüphane kullanılır?',
        answers: [
          'React Router',
          'React Navigation',
          'React Routes',
          'Native Navigator'
        ],
        correctAnswerIndex: 1,
        explanation: 'React Native uygulamalarında sayfalar arası geçiş için React Navigation kütüphanesi kullanılır.'
      },
      {
        question: 'Aşağıdakilerden hangisi React Native\'de veri depolama yöntemlerinden biri değildir?',
        answers: [
          'AsyncStorage',
          'SQLite',
          'Firebase',
          'LocalStorage'
        ],
        correctAnswerIndex: 3,
        explanation: 'LocalStorage web tarayıcıları için kullanılır, React Native\'de kullanılmaz. Bunun yerine AsyncStorage, SQLite veya Firebase gibi çözümler kullanılır.'
      },
      {
        question: 'React Native uygulamasını App Store veya Google Play\'e yüklemek için ne gereklidir?',
        answers: [
          'Sadece JavaScript kodu yeterlidir',
          'Uygulamanın derlenmesi ve paketlenmesi (build) gerekir',
          'Sadece Expo kullanmak yeterlidir',
          'Sadece bir GitHub reposu yeterlidir'
        ],
        correctAnswerIndex: 1,
        explanation: 'React Native uygulamasını mağazalara yüklemek için, uygulamanın derlenmesi ve paketlenmesi (build) gerekir. Bu işlem platform özel konfigürasyonlar ve imzalama işlemleri içerir.'
      }
    ]
  }
};
