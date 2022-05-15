import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./layout"
import { pages } from "./pages"
import { Page } from "./utils"

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          {Object.keys(pages).map(key => (
            <Route
              path={pages[key].path}
              key={key}
              element={<Page page={pages[key]} />}
            />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
