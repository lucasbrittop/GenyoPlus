# Genyo Timer

Extensão Chrome que mostra quanto tempo falta para o fim do expediente no Genyo.

## Funcionalidades

- **Barra flutuante** no rodapé com tempo restante, barra de progresso e horário estimado de saída
- **Alerta de saída** com popup quando faltam entre 5 e 10 minutos

## Instalação

```bash
git clone https://github.com/lucasbrittop/Genyo-.git
cd Genyo-
npm install
npm run build
```

Depois:
1. Abra `chrome://extensions`
2. Ative **Modo do desenvolvedor**
3. Clique em **Carregar sem compactação**
4. Selecione a pasta `dist/`

Acesse `https://app.genyo.com.br/c/registroPonto` e a barra aparece automaticamente.
