# Product Stock Manager - Frontend

Sistema de gerenciamento de estoque construído com Next.js, React e TypeScript. Interface para controlar produtos, categorias, usuários e movimentações de estoque em tempo real.

## Funcionalidades Principais

- Autenticação com JWT (access/refresh tokens em HTTP-only cookies)
- Dashboard com analytics e gráficos de movimentações
- CRUD de produtos, categorias e usuários
- Rastreamento de entrada e saída de estoque
- Alertas de estoque baixo e produtos com movimentação estagnada
- Interface responsiva com suporte a temas claro e escuro
- Validação de formulários com Zod

## Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| Next.js | 16.1.1 | Framework de aplicação e server-side rendering |
| React | 19.2.3 | Biblioteca de componentes |
| TypeScript | 5.x | Segurança de tipos |
| Axios | 1.13.2 | Cliente HTTP |
| Zod | 4.3.5 | Validação de schemas |
| React Hook Form | 7.70.0 | Gerenciamento de formulários |
| Tailwind CSS | 4.x | Estilização |
| Recharts | 3.6.0 | Gráficos e visualizações |

## Estrutura de Diretórios

```
app/              Next.js App Router com páginas e layouts
components/       Componentes React para UI e lógica de negócio
actions/          Server Actions para processamento no servidor
services/         Camada de abstração para requisições HTTP
schemas/          Schemas de validação com Zod
types/            Interfaces TypeScript
lib/              Utilitários e configurações
public/           Arquivos estáticos
```

## Autenticação e Segurança

O sistema implementa autenticação JWT com fluxo seguro de tokens. No login, o usuário recebe um access token (duração de 1 hora) e um refresh token (duração de 7 dias), ambos armazenados em cookies HTTP-only, inacessíveis a scripts maliciosos. As requisições autenticadas incluem o access token no header Authorization. Quando o access token expira, o sistema utiliza o refresh token para obter um novo par de tokens automaticamente. Todas as server actions adicionam o header de autenticação através da função getServerApi(), garantindo que apenas requisições autenticadas sejam processadas pelo backend.

## Arquitetura de Dados

A aplicação segue uma arquitetura em camadas. O usuário interage com componentes React que disparam server actions. As server actions validam os dados usando schemas Zod e delegam as requisições HTTP para a camada de serviços. Os serviços utilizam um cliente Axios configurado com autenticação automática para comunicar com a API backend. Após mutações de dados, a aplicação invalida o cache do Next.js com revalidatePath e efetua redirecionamento automático, acionando refetch dos dados atualizados.

## Páginas Principais

A aplicação possui uma página de login que autentica o usuário e um painel protegido contendo: dashboard com visualização de valor de estoque total, resumo de movimentações e gráficos; gerenciamento de produtos com listagem paginada e busca; gerenciamento de categorias; operações de movimentação de estoque (entrada e saída); e gerenciamento de usuários. O painel inclui barra lateral com navegação e toggle de tema.

## Variáveis de Ambiente

A aplicação requer uma única variável de ambiente: NEXT_PUBLIC_API_BASE_URL, que define o endpoint da API backend. Esta variável é exposta ao client-side para requisições HTTP.

## Deploy

O projeto está prototipado para deploy em Vercel. O processo é automatizado: ao fazer push do código para o repositório GitHub, Vercel deteta a alteração, executa o build com npm run build, e publica a aplicação. A variável de ambiente NEXT_PUBLIC_API_BASE_URL deve ser configurada no dashboard do projeto antes do primeiro deploy. Deploys subsequentes ocorrem automaticamente a cada commit na branch principal.
