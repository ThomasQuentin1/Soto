import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import MaskedInput from 'react-text-mask';
import FormControl from '@mui/material/FormControl';
import { Cart } from "typing";

const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setValues: any, values: any) => {
    setValues({
        ...values,
        [event.target.name]: event.target.value,
    });
};

const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>, setValues: any) => {
    setValues(event.target.value);
};

interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

const ExpirationDateInputCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, '/', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

const CardNumberInputCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

const CryptogramInputCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

const ZipCodeInputCustom = (props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}


interface PaymentInformationProps {
    cardValues: any;
    setCardValues: any;
    expirationDateValues: any;
    setExpirationDateValues: any;
    cryptogramValues: any;
    setCryptogramValues: any;
    zipCodeValues: any;
    setZipCodeValues: any;
    city: string;
    setCity: any;
    fullAdress: string;
    setFullAdress: any;
    userName: any;
    setUserName: any;
    setNextButtonEnabled: any;
    cart: Cart;
    loading: boolean;
}

const PaymentInformation = ({
    cart,
    loading,
    cardValues,
    setCardValues,
    expirationDateValues,
    setExpirationDateValues,
    cryptogramValues,
    setCryptogramValues,
    userName,
    setUserName,
    setNextButtonEnabled,
    fullAdress,
    setFullAdress,
    zipCodeValues,
    setZipCodeValues
}: PaymentInformationProps) => {
    const [cardErrorText, setCardErrorText] = useState(false);
    const [nameHolderErrorText, setNameHolderErrorText] = useState(false);
    const [expirationDateErrorText, setExpirationDateErrorText] = useState(false);
    const [cryptogramErrorText, setCryptogramErrorText] = useState(false);
    const [zipCodeErrorText, setZipCodeErrorText] = useState(false);
    const [fullAdressErrorText, setFullAdressErrorText] = useState(false);
    // const [cityErrorText, setCityErrorText] = useState(false);

    const [cardTextFieldIsEmpty, setCardTextFieldIsEmpty] = useState(false);
    const [nameHolderTextFieldIsEmpty, setNameHolderTextFieldIsEmpty] = useState(false);
    const [expirationDateTextFieldIsEmpty, setExpirationDateTextFieldIsEmpty] = useState(false);
    const [cryptogramTextFieldIsEmpty, setCryptogramTextFieldIsEmpty] = useState(false);
    // const [fullAdressTextFieldIsEmpty, setFullAdressTextFieldIsEmpty] = useState(false);
    // const [zipCodeTextFieldIsEmpty, setZipCodeTextFieldIsEmpty] = useState(false);
    // const [cityErrorTextFieldIsEmpty, setCityTextFieldIsEmpty] = useState(false);

    /// --- check is input are empty


    useEffect(() => {
        if (!cardValues.textmask.replace(/\s/g, '').length) {
            setCardTextFieldIsEmpty(true)
        } else {
            setCardTextFieldIsEmpty(false);
        }
        if (!userName.replace(/\s/g, '').length) {
            setNameHolderTextFieldIsEmpty(true)
        } else {
            setNameHolderTextFieldIsEmpty(false);
        }
        if (!expirationDateValues.textmask.replace(/\s/g, '').length) {
            setExpirationDateTextFieldIsEmpty(true)
        } else {
            setExpirationDateTextFieldIsEmpty(false);
        }
        if (!cryptogramValues.textmask.replace(/\s/g, '').length) {
            setCryptogramTextFieldIsEmpty(true)
        } else {
            setCryptogramTextFieldIsEmpty(false);
        }
        // if (!zipCodeValues.textmask.replace(/\s/g, '').length) {
        //     setZipCodeTextFieldIsEmpty(true)
        // } else {
        //     setZipCodeTextFieldIsEmpty(false);
        // }
        // if (!city.replace(/\s/g, '').length) {
        //     setCityTextFieldIsEmpty(true)
        // } else {
        //     setCityTextFieldIsEmpty(false);
        // }
        // if (!fullAdress.replace(/\s/g, '').length) {
        //     setFullAdressTextFieldIsEmpty(true)
        // } else {
        //     setFullAdressTextFieldIsEmpty(false);
        // }
    }, []);

    useEffect(() => {
        if (!cardErrorText && !nameHolderErrorText && !expirationDateErrorText && !cryptogramErrorText && !cardTextFieldIsEmpty && !nameHolderTextFieldIsEmpty && !expirationDateTextFieldIsEmpty && !cryptogramTextFieldIsEmpty) {
            setNextButtonEnabled(true);
        } else {
            setNextButtonEnabled(false);
        }
    });

    /// --- end check


    return (
        <Grid container spacing={2} style={{ textAlign: "left", paddingLeft: "35px", marginBottom: "10px" }}>
            <Grid item xs={6}>
                <Typography style={{ textDecoration: "underline", marginBottom: "5px" }}>Information de
                    paiement</Typography>
                <FormControl>
                    {cardErrorText ?
                        <TextField
                            required
                            error
                            label="Numéro de carte"
                            autoFocus={true}
                            color="primary"
                            value={cardValues.textmask}
                            onChange={(event: any) => handleChange(event, setCardValues, cardValues)}
                            name="textmask"
                            id="formatted-card-number-mask-input"
                            InputProps={{
                                inputComponent: CardNumberInputCustom as any,
                            }}
                            helperText="Entrez un numéro valide"
                            onBlur={() => {
                                if (cardValues.textmask.slice(-1) >= '0' && cardValues.textmask.slice(-1) <= '9') {
                                    setCardErrorText(false);
                                }
                                if (!cardValues.textmask.replace(/\s/g, '').length) {
                                    setCardTextFieldIsEmpty(true)
                                } else {
                                    setCardTextFieldIsEmpty(false);
                                }
                            }}
                        />
                        :
                        <TextField
                            required
                            label="Numéro de carte"
                            autoFocus={true}
                            color="primary"
                            value={cardValues.textmask}
                            onChange={(event: any) => handleChange(event, setCardValues, cardValues)}
                            name="textmask"
                            id="formatted-card-number-mask-input"
                            InputProps={{
                                inputComponent: CardNumberInputCustom as any,
                            }}
                            onBlur={() => {
                                if (cardValues.textmask.slice(-1) >= '0' && cardValues.textmask.slice(-1) <= '9') {
                                    // do nothing
                                } else {
                                    setCardErrorText(true);
                                }
                                if (!cardValues.textmask.replace(/\s/g, '').length) {
                                    setCardTextFieldIsEmpty(true)
                                } else {
                                    setCardTextFieldIsEmpty(false);
                                }
                            }}
                            helperText={cardErrorText ? "Entrez un numéro valide" : ""}
                        />}

                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Typography>Prix total du panier : </Typography>
                {!loading && cart &&
                    <Typography style={{ marginLeft: "50px" }}>{cart.price}€</Typography>
                }
            </Grid>
            <Grid item xs={6}>
                {nameHolderErrorText ?
                    <TextField error required InputLabelProps={{ shrink: true }} value={userName}
                        onBlur={() => {
                            if (userName.length !== 0) {
                                setNameHolderErrorText(false);
                            }
                            if (!userName.replace(/\s/g, '').length) {
                                setNameHolderTextFieldIsEmpty(true)
                            } else {
                                setNameHolderTextFieldIsEmpty(false);
                            }
                        }}
                        onChange={(event: any) => handleChangeText(event, setUserName)}
                        label="Titulaire de la carte" margin="dense" color="primary" type="text"
                        helperText="Champ requis" />
                    :
                    <TextField required InputLabelProps={{ shrink: true }} value={userName} onBlur={() => {
                        if (userName.length === 0) {
                            setNameHolderErrorText(true);
                        }
                        if (!userName.replace(/\s/g, '').length) {
                            setNameHolderTextFieldIsEmpty(true)
                        } else {
                            setNameHolderTextFieldIsEmpty(false);
                        }
                    }}
                        onChange={(event: any) => handleChangeText(event, setUserName)}
                        label="Titulaire de la carte" margin="dense" color="primary" type="text" />}

            </Grid>
            <Grid item xs={3}>
                <FormControl>
                    {expirationDateErrorText ?
                        <TextField
                            error
                            required
                            label="Date d'expiration"
                            color="primary"
                            placeholder="MM/YY"
                            value={expirationDateValues.textmask}
                            onChange={(event: any) => handleChange(event, setExpirationDateValues, expirationDateValues)}
                            name="textmask"
                            id="formatted-expiration-date-mask-input"
                            InputProps={{
                                inputComponent: ExpirationDateInputCustom as any,
                            }}
                            helperText="Entrez une date valide"
                            onBlur={() => {
                                if (expirationDateValues.textmask.slice(-1) >= '0' && expirationDateValues.textmask.slice(-1) <= '9') {
                                    setExpirationDateErrorText(false);
                                }
                                if (!expirationDateValues.textmask.replace(/\s/g, '').length) {
                                    setExpirationDateTextFieldIsEmpty(true)
                                } else {
                                    setExpirationDateTextFieldIsEmpty(false);
                                }
                            }}
                        />
                        :
                        <TextField
                            required
                            label="Date d'expiration"
                            color="primary"
                            placeholder="MM/YY"
                            value={expirationDateValues.textmask}
                            onChange={(event: any) => handleChange(event, setExpirationDateValues, expirationDateValues)}
                            name="textmask"
                            id="formatted-expiration-date-mask-input"
                            InputProps={{
                                inputComponent: ExpirationDateInputCustom as any,
                            }}
                            onBlur={() => {
                                if (expirationDateValues.textmask.slice(-1) >= '0' && expirationDateValues.textmask.slice(-1) <= '9') {
                                    // do nothing
                                } else {
                                    setExpirationDateErrorText(true);
                                }
                                if (!expirationDateValues.textmask.replace(/\s/g, '').length) {
                                    setExpirationDateTextFieldIsEmpty(true)
                                } else {
                                    setExpirationDateTextFieldIsEmpty(false);
                                }
                            }}
                        />}

                </FormControl>
            </Grid>
            <Grid item xs={3} style={{ paddingRight: "15px" }}>
                <FormControl>
                    {cryptogramErrorText ?
                        <TextField
                            error
                            label="Cryptogramme"
                            color="primary"
                            value={cryptogramValues.textmask}
                            onChange={(event: any) => handleChange(event, setCryptogramValues, cryptogramValues)}
                            name="textmask"
                            id="formatted-cryptogram-mask-input"
                            helperText="Entrez un cryptogramme valide"
                            InputProps={{
                                inputComponent: CryptogramInputCustom as any,
                            }}
                            onBlur={() => {
                                if (cryptogramValues.textmask.slice(-1) >= '0' && cryptogramValues.textmask.slice(-1) <= '9') {
                                    setCryptogramErrorText(false);
                                }
                                if (!cryptogramValues.textmask.replace(/\s/g, '').length) {
                                    setCryptogramTextFieldIsEmpty(true)
                                } else {
                                    setCryptogramTextFieldIsEmpty(false);
                                }
                            }}
                        />
                        :
                        <TextField
                            label="Cryptogramme"
                            color="primary"
                            value={cryptogramValues.textmask}
                            onChange={(event: any) => handleChange(event, setCryptogramValues, cryptogramValues)}
                            name="textmask"
                            id="formatted-cryptogram-mask-input"
                            InputProps={{
                                inputComponent: CryptogramInputCustom as any,
                            }}
                            onBlur={() => {
                                if (cryptogramValues.textmask.slice(-1) >= '0' && cryptogramValues.textmask.slice(-1) <= '9') {
                                    // do nothing
                                } else {
                                    setCryptogramErrorText(true);
                                }
                                if (!cryptogramValues.textmask.replace(/\s/g, '').length) {
                                    setCryptogramTextFieldIsEmpty(true)
                                } else {
                                    setCryptogramTextFieldIsEmpty(false);
                                }
                            }}
                        />}

                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{ textDecoration: "underline" }}>Adresse de livraison</Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <FormControl>
                            {zipCodeErrorText ?
                                <TextField
                                    error
                                    label="Code postal"
                                    color="primary"
                                    value={zipCodeValues.textmask}
                                    onChange={(event: any) => handleChange(event, setZipCodeValues, zipCodeValues)}
                                    name="textmask"
                                    id="formatted-zip-code-mask-input"
                                    helperText="Entrez un code postal valide"
                                    InputProps={{
                                        inputComponent: ZipCodeInputCustom as any,
                                    }}
                                    onBlur={() => {
                                        if (zipCodeValues.textmask.slice(-1) >= '0' && zipCodeValues.textmask.slice(-1) <= '9') {
                                            setZipCodeErrorText(false);
                                        }
                                        // if (!zipCodeValues.textmask.replace(/\s/g, '').length) {
                                        //     setZipCodeTextFieldIsEmpty(true)
                                        // } else {
                                        //     setZipCodeTextFieldIsEmpty(false);
                                        // }
                                    }}
                                />
                                :
                                <TextField
                                    label="Code postal"
                                    color="primary"
                                    value={zipCodeValues.textmask}
                                    onChange={(event: any) => handleChange(event, setZipCodeValues, zipCodeValues)}
                                    name="textmask"
                                    id="formatted-zip-code-mask-input"
                                    InputProps={{
                                        inputComponent: ZipCodeInputCustom as any,
                                    }}
                                    onBlur={() => {
                                        if (zipCodeValues.textmask.slice(-1) >= '0' && zipCodeValues.textmask.slice(-1) <= '9') {
                                        } else {
                                            setZipCodeErrorText(true);
                                        }
                                        // if (!zipCodeValues.textmask.replace(/\s/g, '').length) {
                                        //     setZipCodeTextFieldIsEmpty(true)
                                        // } else {
                                        //     setZipCodeTextFieldIsEmpty(false);
                                        // }
                                    }}
                                />}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {fullAdressErrorText ?
                            <TextField size={"small"} error required InputLabelProps={{ shrink: true }} value={fullAdress}
                                onBlur={() => {
                                    console.log(fullAdress)
                                    if (fullAdress.length !== 0) {
                                        setFullAdressErrorText(false);
                                    }
                                }}
                                onChange={(event: any) => handleChangeText(event, setFullAdress)}
                                label="Adresse complète" margin="dense" color="secondary" type="text"
                                helperText="Champ requis" />
                            :
                            <TextField required InputLabelProps={{ shrink: true }} value={fullAdress} onBlur={() => {
                                console.log(fullAdress)
                                if (fullAdress.length === 0) {
                                    setFullAdressErrorText(true);
                                }
                            }}
                                onChange={(event: any) => handleChangeText(event, setFullAdress)}
                                label="Adresse complète" margin="dense" color="secondary"
                                type="text" />}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}


export default PaymentInformation;