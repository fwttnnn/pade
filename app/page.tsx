import Chart from "@/components/Chart"
import pade from "@/data/pade"

export default () => {
  let data: {[year: number]: {[city: string]: number}} = {}
  pade.filter((d) => d["jenis_produksi"] == "Padi")
      .forEach((d) => {
        if (!(d["tahun"] in data)) {
          data[d["tahun"]] = {};
        }

        /**
         * NOTE: just to be sure, extra guard for a duplicated city
         */
        if (!(d["bps_nama_kabupaten_kota"] in data[d["tahun"]])) {
          data[d["tahun"]][d["bps_nama_kabupaten_kota"]] = 0
        }

        data[d["tahun"]][d["bps_nama_kabupaten_kota"]] += d["jumlah_produksi"]
      })
    
  // delete data[2019]
  // delete data[2020]
  // delete data[2021]
  // delete data[2022]
  // delete data[2023]
  
  return (
    <main>
      <div
        className="flex flex-col gap-[24px] flex-wrap items-center justify-center"
      >
        <h1
          className="text-7xl"
        >
          atjeh padé production
        </h1>
      </div>

      <Chart.Blob
        data={data}
        size={40}
        width={700}
      />
    </main>
  )
}
