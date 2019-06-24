import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptLocale from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { CrawlerService, PersonalStockService } from "./../../services";
import { Report, Loading } from "../../components";
import { StocksWrapper } from "./Styled";
import { Form, Label } from "../settings/Styled";
import { WarningText as ErrorText } from "../auth/Styled";
import StocksImage from "../../media/images/stocks-image.jpeg";
import { getToken } from "../../utils/token";
import {
  EditIcon,
  DeleteIcon,
  WarningText,
  CoverImage,
  CustomRow,
  CustomCol,
  Title,
  SubmitButton
} from "../alerts/Styled";
import {
  ExportIcon,
  Input,
  Dropdown,
  TextInput,
  Option,
  DatePicker,
  Stock,
  StockTitle,
  StockText,
  StockOptions,
  StockInfo,
  StockLink
} from "./Styled";

function PersonalStocks() {
  const [userId] = useState(getToken().user.uid);
  const [isLoading, showLoading] = useState(true);
  const [isFormVisible, showForm] = useState(false);
  const [options, setOptions] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [report, showReport] = useState(false);
  // Formulário
  const [stockId, setStockId] = useState(null);
  const [description, setDescription] = useState("");
  const [stockName, setStockName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [price, setPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [postScriptum, setPostScriptum] = useState("");

  const warningTexts = [];

  useEffect(() => {
    const promises = [
      CrawlerService.obterTitulosAtualizados(),
      PersonalStockService.obterTitulosPessoais(userId)
    ];

    Promise.all(promises).then(responses => {
      const optionsList = responses[0].data.lista_titulos.filter(
        x => x.tipo_titulo.grupo_titulo.tipo === 1
      );

      setOptions(optionsList);
      setStockList(responses[1].data);
      showLoading(false);
    });

    CrawlerService.obterTitulosAtualizados().then(response => {});
  }, []);

  const fillForm = stock => {
    if (!stock) {
      setStockId(null);
      setDescription("");
      setStockName("");
      setPurchaseDate(null);
      setPrice("");
      setInterestRate("");
      setPostScriptum("");
      return;
    }

    setStockId(stock.id);
    setDescription(stock.descricao);
    setStockName(stock.nome_titulo);
    setPurchaseDate(stock.data_aquisicao);
    setPrice(stock.valor);
    setInterestRate(stock.taxa_rendimento);
    setPostScriptum(stock.observacao);
  };

  const toggleForm = () => {
    fillForm();
    showForm(!isFormVisible);
  };

  const handleSubmit = () => {
    const data = {
      usuario_id: userId,
      descricao: description,
      nome_titulo: stockName,
      data_aquisicao: purchaseDate,
      valor: price,
      taxa_rendimento: interestRate,
      observacao: postScriptum
    };

    showLoading(true);

    if (!stockId) {
      return addStock(data);
    }

    editStock(stockId, data);
  };

  const addStock = data => {
    PersonalStockService.adicionarTituloPessoal(data).then(response => {
      if (response.data) {
        PersonalStockService.obterTitulosPessoais(userId).then(response => {
          setStockList(response.data);
          showLoading(false);
          toggleForm();
        });
      } else {
        showLoading(false);
      }
    });
  };

  const editStock = (id, data) => {
    PersonalStockService.editarTituloPessoal(id, data).then(response => {
      if (response.data) {
        PersonalStockService.obterTitulosPessoais(userId).then(response => {
          setStockList(response.data);
          showLoading(false);
          toggleForm();
        });
      } else {
        showLoading(false);
      }
    });
  };

  const deleteStock = id => {
    showLoading(true);

    PersonalStockService.removerTituloPessoal(id).then(response => {
      if (response.data) {
        PersonalStockService.obterTitulosPessoais(userId).then(response => {
          setStockList(response.data);
          showLoading(false);
        });
      } else {
        showLoading(false);
      }
    });
  };

  const renderList = () => {
    return stockList.map(stock => {
      const formattedDate = format(new Date(stock.data_aquisicao), "MM/yyyy");

      return (
        <Stock key={stock.id}>
          <StockInfo>
            <StockTitle>{stock.descricao}</StockTitle>
            <StockText>{stock.nome_titulo} | </StockText>
            <StockText>{`Comprado em ${formattedDate}`}</StockText>
          </StockInfo>

          <StockOptions>
            <StockLink onClick={() => showReport(stock)}>
              <ExportIcon size="1.5em" />
            </StockLink>
            <StockLink
              onClick={() => {
                fillForm(stock);
                showForm(true);
              }}
            >
              <EditIcon size="1.4em" />
            </StockLink>
            <StockLink onClick={() => deleteStock(stock.id)}>
              <DeleteIcon size="1.4em" />
            </StockLink>
          </StockOptions>
        </Stock>
      );
    });
  };

  const renderOptions = () => {
    return options.map(({ nome_titulo }, index) => {
      return (
        <Option key={index} value={nome_titulo}>
          {nome_titulo.replace("Tesouro", "")}
        </Option>
      );
    });
  };

  const renderForm = () => {
    return (
      <>
        <CustomRow>
          <CustomCol>
            <Title>Novo título</Title>
          </CustomCol>
          <CustomCol>
            <SubmitButton onClick={() => toggleForm()}>Voltar</SubmitButton>
          </CustomCol>
        </CustomRow>
        <Form>
          <CustomRow>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Label>Descrição</Label>
              <TextInput
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
              />
            </Col>

            <Col xs={6} sm={6} md={6} lg={6}>
              <Label>Título</Label>
              <Dropdown
                value={stockName}
                onChange={e => setStockName(e.target.value)}
              >
                <Option value="">Selecione</Option>
                {renderOptions()}
              </Dropdown>
            </Col>
          </CustomRow>

          <CustomRow>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Label>Mês e ano de aquisição</Label>
              <DatePicker
                value={purchaseDate}
                onChange={date => setPurchaseDate(date)}
                fullWidth
              />
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <Label>Valor investido</Label>
              <CurrencyFormat
                value={price}
                onValueChange={e => setPrice(e.value)}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={"R$ "}
              />
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <Label>Taxa de Rendimento</Label>
              <CurrencyFormat
                value={interestRate}
                onValueChange={e => setInterestRate(e.value)}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                suffix={" % a.a."}
              />
            </Col>
          </CustomRow>

          <Col xs={12} sm={12} md={12} lg={12}>
            <Label>Observações</Label>
            <TextInput
              value={postScriptum}
              onChange={e => setPostScriptum(e.target.value)}
              fullWidth
              multiline
            />
          </Col>

          {warningTexts && (
            <Col xs={12} sm={12} md={12} lg={12}>
              {warningTexts.map((text, index) => (
                <ErrorText
                  key={index}
                  style={
                    index === 0
                      ? { marginTop: "3rem" }
                      : { marginTop: "0.5rem" }
                  }
                >
                  {text}
                </ErrorText>
              ))}
            </Col>
          )}
        </Form>

        <SubmitButton onClick={() => handleSubmit()}>Confirmar</SubmitButton>
      </>
    );
  };

  const renderStocks = () => {
    return (
      <>
        <CustomRow>
          <CustomCol>
            <Title>Meus títulos pessoais</Title>
          </CustomCol>
          <CustomCol>
            <SubmitButton onClick={() => toggleForm()}>
              Criar novo título
            </SubmitButton>
          </CustomCol>
        </CustomRow>
        {stockList.length > 0
          ? renderList()
          : !isLoading && (
              <WarningText>
                Não há nenhum título cadastrado até o momento
              </WarningText>
            )}
      </>
    );
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      {isLoading && <Loading />}
      <Container>
        {report ? (
          <Report data={report} />
        ) : (
          <StocksWrapper>
            <>
              <CoverImage image={StocksImage} />
              {isFormVisible ? renderForm() : renderStocks()}
            </>
          </StocksWrapper>
        )}
      </Container>
    </MuiPickersUtilsProvider>
  );
}

export default PersonalStocks;
