import Navbar from "@/app/components/Navbar";
import UploadExcelFile from "@/app/components/UploadExcelFile";
import ViewResults from "./components/ViewResults";
// import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="space-y-9">
      <Navbar />
      <UploadExcelFile />
      <ViewResults/>
      {/* <Footer /> */}
    </div>
  );
}
