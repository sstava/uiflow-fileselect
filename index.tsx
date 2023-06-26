// @ts-nocheck
import * as React from 'react';
import { PropType, registerComponent } from '@uiflow/cli';

export type Props = React.HTMLProps<HTMLInputElement> & {
  label: string;
};

const FileSelect: React.FC<Props> = ({ className, onChange, label }) => {
  return (
    // <button className={className} onClick={onClick}>
    //   {label}
    // </button>
	<div>
	  <input type="file" name="file" onChange={onChange} />
	</div>    
  );
}

export default registerComponent('my-fileselect-component', {
  component: FileSelect,
  name: 'File Select',
  props: [
    {
      name: 'label',
      type: PropType.String,
      value: 'My Label',
    },
    {
      name: 'onChange',
      type: PropType.Event,
      onEmit({ args, emit }) {
		// console.log(args[0].target.files[0]);
		let file = args[0].target.files[0];
		
		const getBase64 = file => {
		    return new Promise(resolve => {
		      let fileInfo;
		      let baseURL = "";
		      // Make new FileReader
		      let reader = new FileReader();

		      // Convert the file to base64 text
		      reader.readAsDataURL(file);

		      // on reader load somthing...
		      reader.onload = () => {
		        // Make a fileInfo Object
		        // console.log("Called", reader);
		        baseURL = reader.result;
		        // console.log('XXXX ' + baseURL);
		        resolve(baseURL);
		      };
		      // console.log(fileInfo);
		    });
		  };

		  getBase64(file)
      		.then(result => {
		        file["base64"] = result;
		        // console.log("File Is", file);
            emit('onSuccess', { file: result })
		    });
      }
    },
	{
	    type: PropType.Event,
	    name: 'onSuccess',
	    arguments: [
	      {
	        name: 'file',
	        type: PropType.String,
	      }
	    ]
	  }    
  ]
});