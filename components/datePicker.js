export default function DatePickerComponent({startDate, endDate, setStartDate, setEndDate}){
    const currentDate = new Date();
    console.log("Dateeee");
    return (
        <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
              <div className="flex gap-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  From Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={currentDate} 
                  dateFormat="dd/MM/yyyy"
                  className="w-full appearance-none shadow border rounded py-3 px-4"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  To Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  maxDate={currentDate} 
                  dateFormat="dd/MM/yyyy"
                  className="w-full appearance-none shadow border rounded py-3 px-4"
                />
              </div>
              </div>
              <div>
                <button
                  className="px-4 py-2 my-2 rounded-md bg-blue-800 text-white"
                  onClick={() => fetchData()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
    )
}