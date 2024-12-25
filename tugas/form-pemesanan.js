const hargaPerKamar = {
    standar: 500000,
    deluxe: 700000,
    family: 1000000
};

$(document).ready(function () {
    const $pemesananForm = $('#pemesananForm');
    const $tipeKamar = $('#tipe_kamar');
    const $durasiMenginap = $('#durasi_menginap');
    const $breakfastCheckbox = $('input[name="breakfast"]');
    const $hargaKamarInput = $('#harga_kamar');
    const $totalBayarInput = $('#total_bayar');
    const $resumeDiv = $('#resume');
    const $resumeDetails = $('#resumeDetails');

    function calculateTotal() {
        const tipe = $tipeKamar.val();
        const durasi = parseInt($durasiMenginap.val()) || 0;
        let total = 0;
        let breakfast = 0;

        if (tipe !== "-" && durasi > 0) {
            total = hargaPerKamar[tipe] * durasi;
            if (durasi > 3) {
                total *= 0.1;
            }
            breakfast = $('input[name="breakfast"]:checked').val() === "Ya" ? 80000 : 0;
            total += breakfast;
        }
        $hargaKamarInput.val(hargaPerKamar[tipe] || '');
        $totalBayarInput.val(total + breakfast);
    }

    $tipeKamar.on('change', calculateTotal);
    $durasiMenginap.on('input', calculateTotal);
    $breakfastCheckbox.on('change', calculateTotal);

    $pemesananForm.on('submit', function (event) {
        event.preventDefault();
        const formData = $pemesananForm.serializeArray();
        let isValid = true;

        formData.forEach(({ name, value }) => {
            if (!value && name !== 'breakfast') {
                isValid = false;
            }
        });

        if (isValid) {
            $resumeDiv.show();
            const formObject = {};
            formData.forEach(({ name, value }) => {
                formObject[name] = value;
            });

            $resumeDetails.html(`
                <strong>Id Pemesan:</strong> ${formObject['id_pemesan']}<br>
                <strong>Nama Pemesan:</strong> ${formObject['nama_pemesan']}<br>
                <strong>Nomor Identitas:</strong> ${formObject['nomor_identitas']}<br>
                <strong>Jenis Kelamin:</strong> ${formObject['jenis_kelamin']}<br>
                <strong>Tipe Kamar:</strong> ${formObject['tipe_kamar']}<br>
                <strong>Durasi Menginap:</strong> ${formObject['durasi_menginap']} Hari<br>
                <strong>Termasuk Breakfast:</strong> ${formObject['breakfast']}<br>
                <strong>Total Bayar:</strong> ${formObject['total_bayar']}<br>
            `);
        } else {
            alert('Mohon lengkapi semua data');
        }
    });
});
