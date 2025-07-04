import AddProperty from "@/components/addpropertymultistepform/addProperty";
import Breadcrumb from "@/components/breadcrumbs/breadCrumb";


export default function ViewPayments() {
const fakeTitle = 'Thika Road Bedsitter'; 
  
  return (
        <div>   
           <Breadcrumb
        links={[
          { label: 'Dashboard', to: '/admin/dashboard' },
          { label: 'Properties', to: '/admin/dashboard/properties' },
          { label: fakeTitle }
        ]}
      />
            <h1>Manage Properties</h1>;
            <AddProperty/>
        </div>

  ); 
}
