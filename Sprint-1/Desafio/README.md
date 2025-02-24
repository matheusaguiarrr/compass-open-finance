# 📖 Guia de Markdown  

Markdown é uma linguagem de marcação assim como o HTML, porém plainText (Texto puro). Criada por John Gruber e Aaron Swartz, o markdown converte o texto para HTML. Podem ter peculiaridades de onde o markdown for executado, o Github por exemplo, tem emojis e é possível especificar a linguagem de um bloco de código.

## 🔹 Índice  

1. [Cabeçalhos](#1️⃣-cabeçalhos)
2. [Ênfase (Negrito, Itálico e Riscado)](#2️⃣-ênfase-negrito-itálico-e-riscado)
3. [Listas (Ordenadas e Não Ordenadas)](#3️⃣-listas-ordenadas-e-não-ordenadas)
4. [Links](#4️⃣-links)
5. [Imagens](#5️⃣-imagens)
6. [Citações](#6️⃣-citações)
7. [Código (Inline e Blocos)](#7️⃣-código-inline-e-blocos)
8. [Tabelas](#8️⃣-tabelas)
9. [Linhas Horizontais](#9️⃣-linhas-horizontais)
10. [Listas de Tarefas](#🔟-listas-de-tarefas)
11. [Blocos de Aviso (Extensões)](#1️⃣1️⃣-blocos-de-aviso-extensões)
12. [Escapando Caracteres](#1️⃣2️⃣-escapando-caracteres)

---

## 1️⃣ Cabeçalhos  

Use `#` para criar cabeçalhos. O Markdown suporta até seis níveis:

# Título H1
## Título H2
### Título H3
#### Título H4
##### Título H5
###### Título H6

```markdown
# Título H1
## Título H2
### Título H3
#### Título H4
##### Título H5
###### Título H6
```

---

## 2️⃣ Ênfase (Negrito, Itálico e Riscado)  

| Formatação | Sintaxe | Exemplo |
|------------|--------|---------|
| **Negrito** | `**texto**` ou `__texto__` | **Texto em negrito** |
| *Itálico* | `*texto*` ou `_texto_` | *Texto em itálico* |
| ~~Tachado~~ | `~~texto~~` | ~~Texto tachado~~ |

```markdown
**Texto em negrito**
*Texto em itálico*
~~Texto riscado~~
```

---

## 3️⃣ Listas (Ordenadas e Não Ordenadas)  

### 🔹 Lista Não Ordenada  

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3
```

### 🔹 Lista Ordenada

1. Primeiro item
2. Segundo item
   1. Subitem 2.1
   2. Subitem 2.2
3. Terceiro item

```markdown
1. Primeiro item
2. Segundo item
   1. Subitem 2.1
   2. Subitem 2.2
3. Terceiro item
```

---

## 4️⃣ Links

[Texto do link](https://exemplo.com)

```markdown
[Texto do link](https://exemplo.com)
```

---

## 5️⃣ Imagens

![Texto alternativo](https://via.placeholder.com/150)

```markdown
![Texto alternativo](https://via.placeholder.com/150)
```

Para adicionar um link a uma imagem:  

```markdown
[![Texto alternativo](https://via.placeholder.com/150)](https://exemplo.com)
```

---

## 6️⃣ Citações

> Esta é uma citação.
>> Esta é uma citação aninhada.

```markdown
> Esta é uma citação.
>> Esta é uma citação aninhada.
```

---

## 7️⃣ Código (Inline e Blocos)  

### 🔹 Código Inline

`print("Hello, World!")`

```markdown
`print("Hello, World!")`
```

### 🔹 Bloco de Código

```python
def hello():
    print("Hello, World!")
```

```markdown
    ```python
        def hello():
            print("Hello, World!")
    ```
```

---

## 8️⃣ Tabelas

| Nome  | Idade | Profissão  |
|--------|------|------------|
| Alice  | 25   | Engenheira |
| Bob    | 30   | Designer   |

```markdown
| Nome  | Idade | Profissão  |
|--------|------|------------|
| Alice  | 25   | Engenheira |
| Bob    | 30   | Designer   |
```

---

## 9️⃣ Linhas Horizontais

---
***
___

```markdown
---
ou
***
ou
___
```

---

## 🔟 Listas de Tarefas

- [x] Tarefa concluída
- [ ] Tarefa pendente

```markdown
- [x] Tarefa concluída
- [ ] Tarefa pendente
```

---

## 1️⃣1️⃣ Blocos de Aviso (Extensões)  

```markdown
> 🚀 Dica: Use Markdown para formatar textos rapidamente.
> ⚠️ Atenção: Algumas sintaxes podem não ser suportadas em todos os editores.
```

---

## 1️⃣2️⃣ Escapando Caracteres  

Para exibir caracteres reservados (`*`, `_`, `#`, etc.), use `\` antes do caractere:

\*Texto sem itálico\*
<br>
\# Isso não será um cabeçalho

```markdown
\*Texto sem itálico\*
\# Isso não será um cabeçalho
```

---