/**
* Script Name : Screening Mandiri
* Language Code : Google Script(JavaScript)
* Build Data : 16 - okt - 2020 (Yogyakarta/Indonesia)
* Credit : @Aghisna12
*/

function mulaiSkrining(chat_id) {
  var pesan = '<b>Screening Mandiri COVID-19</b>\n\n<b>Pandemi <u>COVID-19</u></b>\n';
  pesan += 'Siapa Yang Perlu Melakukan Pemeriksaan Kesehatan Ke Rumah Sakit?\n\n';
  pesan += 'Sistem Screening Mandiri Ini Terinspirasi Dari Website <a href="https://skrining.jogjaprov.go.id/web_screening_mandiri">skrining.jogjaprov.go.id</a>\n\n';
  pesan += 'Juga dari informasi(COVID-19) Struktur Prioritas ke Rumah Sakit, pada gambar <a href="https://sardjito.co.id/sardjitowp/wp-content/uploads/2020/04/POSTER-covid_STRUKTUR-1.jpg">POSTER-covid_STRUKTUR</a> yang bersumber dari\n';
  pesan += '\t\t• <a href="https://sardjito.co.id/covid-19/">sardjito.co.id/covid-19</a>\n';
  pesan += '\t\t• Pedoman pencegahan & pengendalian Coronavirus Disease (Covid-19) Revisi ke-3\n';
  pesan += '\t\t• Surat Edaran No.HK.02.01/MENKES/202/2020 Tentang Protokol Isolasi Diri Sendiri Dalam Penanganan Coronavirus Disease (Covid-19)\n\n';
  pesan += 'Kami tidak menyimpan data/hasil screening COVID-19 anda\nTerimakasih';
  var keyboard = {
    "inline_keyboard":[[{'text':'MULAI','callback_data':'screening_'}]]
  }
  sendMessageKeyboard(chat_id, pesan, keyboard);
}

function screeningMandiri(chat_id, message_id, callback_data) {
  var hasil = "<b>Hasil Screening Mandiri (COVID-19)</b>\n";
  hasil += "<i>" + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd-MMMM-yyyy HH:mm:ss') + " WIB</i>\n\n";
  var gejala = '\n• Demam\n• Batuk\n• Pilek\n• Sesak Nafas';
  var info_rujukan = 'Datang ke Fasilitas Kesehatan terdekat atau Hubungi segera layanan kesehatan\n\n<b>Hotline COVID-19</b> <code>(0274) 583613</code>';
  var periksa = 'Periksakan diri ke Fasilitas Kesehatan terdekat dan Selalu jaga kesehatan Anda, istirahat yang cukup, makan makanan yang bergizi, menjalankan pola hidup sehat, dan olah raga yang teratur.';
  var karantina = "Untuk mengantisipasi penyebaran <b>Covid-19</b> disarankan untuk mengisolasi diri Anda selama 14 hari terhitung setelah kontak atau kunjungan.\nSelalu jaga kesehatan Anda, istirahat yang cukup, makan makanan yang bergizi, menjalankan pola hidup sehat, dan olah raga yang teratur.\nSegera periksa ke Fasilitas Kesehatan terdekat jika ada keluhan.";
  var baik = 'Anda tidak perlu memeriksakan diri kerumah sakit <b>Selalu Jaga Kesehatan</b>(istirahat yang cukup, makan makanan yang bergizi, dan menjalankan pola hidup sehat)';
  var pertanyaan = {
    'screening_':'<b>Pernah kontak dengan pasien positif COVID-19</b> (berada dalam satu ruangan yang sama/kontak dalam jarak 1 meter) atau <b>pernah berkunjung ke Negara / Daerah Transmisi lokal COVID-19</b> dalam 14 hari terakhir\n',
    'screening_ya':'Sedang atau pernah mengalami ; ' + gejala,
    'screening_ya_ya':hasil + info_rujukan,
    'screening_ya_tidak':'Lakukan <b>Isolasi/Karantina Mandiri</b> dirumah selama 14 hari',
    'screening_ya_tidak_isolasimandiri_sudah':'Selama 14 hari karantina diri, Anda mengalami;' + gejala,
    'screening_ya_tidak_isolasimandiri_belum':hasil + karantina,
    'screening_ya_tidak_isolasimandiri_sudah_ya':hasil + info_rujukan,
    'screening_ya_tidak_isolasimandiri_sudah_tidak':hasil + baik,
    'screening_tidak':'Sedang atau pernah mengalami ; ' + gejala,
    'screening_tidak_ya':hasil + periksa,
    'screening_tidak_tidak':hasil + baik
  }
  if (callback_data == "screening_") {
    var keyboard = {
      "inline_keyboard":[[{'text':'YA','callback_data':'screening_ya'},{'text':'TIDAK','callback_data':'screening_tidak'}]]
    }
    sendMessageKeyboard(chat_id, pertanyaan[callback_data], keyboard);
  } else if (callback_data.includes("screening_ya")) {
    if (callback_data == "screening_ya") {
      var keyboard = {
        "inline_keyboard":[[{'text':'YA','callback_data':'screening_ya_ya'},{'text':'TIDAK','callback_data':'screening_ya_tidak'}]]
      }
      editMessageText(chat_id, message_id, pertanyaan[callback_data], keyboard);
    } else if (callback_data == "screening_ya_ya") {
      editMessageText(chat_id, message_id, pertanyaan[callback_data]);
    } else if (callback_data == "screening_ya_tidak") {
      var keyboard = {
        "inline_keyboard":[[{'text':'SUDAH','callback_data':'screening_ya_tidak_isolasimandiri_sudah'},{'text':'BELUM','callback_data':'screening_ya_tidak_isolasimandiri_belum'}]]
      }
      editMessageText(chat_id, message_id, pertanyaan[callback_data], keyboard);
    } else if (callback_data == "screening_ya_tidak_isolasimandiri_sudah") {
      var keyboard = {
        "inline_keyboard":[[{'text':'YA','callback_data':'screening_ya_tidak_isolasimandiri_sudah_ya'},{'text':'TIDAK','callback_data':'screening_ya_tidak_isolasimandiri_sudah_tidak'}]]
      }
      editMessageText(chat_id, message_id, pertanyaan[callback_data], keyboard);
    } else if (callback_data == "screening_ya_tidak_isolasimandiri_belum") {
      editMessageText(chat_id, message_id, pertanyaan[callback_data]);
    } else if (callback_data == "screening_ya_tidak_isolasimandiri_sudah_ya") {
      editMessageText(chat_id, message_id, pertanyaan[callback_data]);
    } else if (callback_data == "screening_ya_tidak_isolasimandiri_sudah_tidak") {
      editMessageText(chat_id, message_id, pertanyaan[callback_data]);
    }
  } else if (callback_data.includes("screening_tidak")) {
    if (callback_data == "screening_tidak") {
      var keyboard = {
        "inline_keyboard":[[{'text':'YA','callback_data':'screening_tidak_ya'},{'text':'TIDAK','callback_data':'screening_tidak_tidak'}]]
      }
      editMessageText(chat_id, message_id, pertanyaan[callback_data], keyboard);
    } else if (callback_data == "screening_tidak_ya") {
      editMessageText(chat_id, message_id, pertanyaan[callback_data]);
    } else if (callback_data == "screening_tidak_tidak") {
      editMessageText(chat_id, message_id, pertanyaan[callback_data]);
    }
  }
}
