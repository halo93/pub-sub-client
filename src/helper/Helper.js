

export const convertToTimestampToLocaleString = (timestamp) => {
    return new Date(timestamp).toLocaleString().replace(',','');
}

export const send_dummy = (theInput) => {
    //Do something with the input
    encode("abc".repeat(50));
    return {status:200,message:"Failed to send message"};
};

export function encode(input_string) {
    const ID_array = ID_generator();
    const compact_ID_array = ID_compacter(ID_array);//For displaying on the GUI
    //console.log(compact_ID_array);
    //console.log(ID_array)
    const binary_string = string_to_binary(input_string);
    const binary_array = binary_string.split('').map(Number);

    const bin_chunks_arrays_with_head = adding_headers(binary_array)

    const bipolar_chunks_arrays_with_head = bin_array_to_bipolar(bin_chunks_arrays_with_head)

    let encoded_final_data_chunks = [];

    for (let i = 0; i < bipolar_chunks_arrays_with_head.length; i++){
        let single_chunk_array = []
        for (let j = 0; j < 1000; j++){
            const encoding_opr = (bipolar_chunks_arrays_with_head[i][j] * ID_array[j]) + ID_array[j];
            single_chunk_array.push(encoding_opr);
        }
        encoded_final_data_chunks.push(single_chunk_array);
    }
    //console.log(encoded_final_data_chunks);
    return [ID_array,encoded_final_data_chunks];
}

export function decode(encoded_msg_array, ID_array){
    const bipolar_chunks_arrays_with_head = []

    for (let i = 0; i < encoded_msg_array.length; i++){
        let single_chunk_array = []
        for (let j = 0; j < 1000; j++){
            const rvrs_encoding_opr = (encoded_msg_array[i][j] - ID_array[j]) / ID_array[j];
            single_chunk_array.push(rvrs_encoding_opr);
        }
        bipolar_chunks_arrays_with_head.push(single_chunk_array);
    }
    const bin_chunks_arrays_with_head = bipolar_arrays_to_binary(bipolar_chunks_arrays_with_head);
    const binary_array = removing_headers(bin_chunks_arrays_with_head);

    const msg_str = binary_array_to_msg_str(binary_array);

    return msg_str;
}

function binary_array_to_msg_str(binary_array){
    let msg = "";
    for (let i = 0; i < binary_array.length; i=i+8){
        const one_char_bin = binary_array.slice(i, i + 8).join("");
        msg += String.fromCharCode(parseInt(one_char_bin, 2));
    }
    return msg;
}

function removing_headers(bin_chunks_arrays_with_head){
    const sequence_number_h_bits = 10;
    const data_length_h_bits = 10;
    const data_bits = 980;

    const chunks_num = bin_chunks_arrays_with_head.length;

    let seq_num_with_chunk_dict = {}

    for (let i = 0; i < chunks_num; i++){
        const sequence_num_bin_str = bin_chunks_arrays_with_head[i].slice(0,10).join("");
        const seq_num = parseInt(sequence_num_bin_str, 2);

        const data_length_bin_str = bin_chunks_arrays_with_head[i].slice(10,20).join("");
        const data_length = parseInt(data_length_bin_str, 2);

        seq_num_with_chunk_dict[seq_num] = bin_chunks_arrays_with_head[i].slice(20, 20 + data_length);
    }

    let sorted_binary_array = [];
    for (let j = 0; j < chunks_num; j++){
        sorted_binary_array = sorted_binary_array.concat(seq_num_with_chunk_dict[j]);
    }
    return sorted_binary_array;
}

function bipolar_arrays_to_binary(bipolar_chunks_arrays_with_head){
    const bin_chunks_arrays_with_head = bipolar_chunks_arrays_with_head.map(array => {
        return array.map(e => {
            if (e === -1) {
                return 0;
            }
            return e;
        })
    })
    return bin_chunks_arrays_with_head;
}


function bin_array_to_bipolar(binary_array){
    const bipolar_chunks_arrays_with_head = binary_array.map(array => {
        return array.map(e => {
            if (e === 0) {
                return -1;
            }
            return e;
        })
    })
    return bipolar_chunks_arrays_with_head;
}

function adding_headers(binary_array){
    const sequence_number_h_bits = 10;
    const data_length_h_bits = 10;
    const data_bits = 980;
    const full_data_length_in_bin = data_bits.toString(2).padStart(10,0).split('').map(Number);

    const chunks_num = Math.ceil(binary_array.length/980);

    let chunks_array = [];

    for (let i = 0; i < chunks_num; i++){
        const seq_header = i.toString(2).padStart(10,0).split('').map(Number);
        if (i != (chunks_num - 1)){
            const data_chunk = binary_array.slice(0,data_bits);

            chunks_array.push([...seq_header, ...full_data_length_in_bin, ...data_chunk]);
        }
        else{
            const last_chunk_first_index = i*980;
            const last_chunk_data_length_in_bin = (binary_array.length - last_chunk_first_index).toString(2).padStart(10,0).split('').map(Number);
            const data_chunk = binary_array.slice(last_chunk_first_index, binary_array.length);
            const ones_padding = new Array(980 - data_chunk.length).fill(1);;

            chunks_array.push([...seq_header, ...last_chunk_data_length_in_bin, ...data_chunk, ...ones_padding]);
        }
    }
    return chunks_array;
}

function ID_generator(){
    let ID_array = []
    let rand_number = 0;
    for (let i = 0; i < 1000; i++){ //1000 length of the ID
        rand_number = Math.random();
        if (rand_number < 0.5) {
            ID_array.push(-1);
        }
        else{
            ID_array.push(1);
        }
    }
    return ID_array;
}

function ID_compacter(ID_array){
    let ID_array_with_zeros = [];
    for (let i = 0; i < ID_array.length; i++){
        if (ID_array[i] == -1){
            ID_array_with_zeros.push(0);
        }
        else
        {
            ID_array_with_zeros.push(1);
        }
    }

    let compact_int_array = []

    let binary_8_bits = "";
    for (let i = 0; i < ID_array.length; i = i+8){
        binary_8_bits = "";

        binary_8_bits += ID_array_with_zeros[i].toString();
        binary_8_bits += ID_array_with_zeros[i+1].toString();
        binary_8_bits += ID_array_with_zeros[i+2].toString();
        binary_8_bits += ID_array_with_zeros[i+3].toString();
        binary_8_bits += ID_array_with_zeros[i+4].toString();
        binary_8_bits += ID_array_with_zeros[i+5].toString();
        binary_8_bits += ID_array_with_zeros[i+6].toString();
        binary_8_bits += ID_array_with_zeros[i+7].toString();

        compact_int_array.push(parseInt(binary_8_bits, 2));
    }
    return compact_int_array;
}

const string_to_binary = (str = '') => {
    let res = '';
    res = str.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8,0);
    }).join('');
    return res;
};

