function qs(name){ return new URLSearchParams(location.search).get(name); }
function formatPrice(p){ return "$"+p.toFixed(2); }

const fallbackImages = {
  'Samsung 970 EVO Plus 1TB':'https://images.samsung.com/is/image/samsung/in-970-evoplus-nvme-m2-ssd-mz-v7s1t0bw-frontblack-thumb-142279033',
  'Crucial MX500 1TB':'https://http2.mlstatic.com/D_NQ_NP_758449-MLV49823369460_052022-O.webp',
  'WD Black SN850 1TB':'https://fullh4rd.com.ar/img/productos/12/hd-ssd-1tb-wd-black-sn850x-m2-nvme-gen4-7300mbs-0.jpg',
  'Samsung 980 PRO 1TB':'https://image-us.samsung.com/SamsungUS/home/computing/memory-storage/portable-solid-state-drives/0730202441140/MZ-V8P1T0B-AM_S_COM_N01_V01.jpg?$default-jpg$?$product-details-blur-jpg$',
  'Seagate Barracuda 2TB':'https://brateisa.com/wp-content/uploads/2024/09/Seagate-ST2000DM008-Barracuda-Disco-duro-interno-2-TB.jpg',
  'Kingston A2000 1TB':'https://media.kingston.com/kingston/press/A2000_press_release_455x284.jpg',
  'Crucial P3 1TB':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzDqv1nuwLfp-SmW0OGxQJKern27U4jcnIgw&s',
  'Sabrent Rocket 1TB':'https://sabrent.com/cdn/shop/products/SB-ROCKET-1TB-Main-5_38e3dffc-07ab-4c9d-a970-24341ffbda0c_2048x.jpg?v=1688174938',
  'SanDisk Extreme Pro 1TB':'https://m.media-amazon.com/images/I/614nzvYB1HL._AC_UF894,1000_QL80_.jpg',
  'ADATA XPG SX8200 1TB':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvE-Moc7fHNCqj0zgjLRVgF8wFmQYHjf61eg&s',
  'Intel 670p 1TB':'https://m.media-amazon.com/images/I/81orrCnzpaS.jpg',
  'Toshiba X300 4TB':'https://www.toshiba-storage.com/wp/wp-content/uploads/2019/09/X300_Highlihgt_Product_Image.png',
  'Seagate FireCuda 1TB':'https://acf.geeknetic.es/imgri/Imagenes/Tutoriales/2020/1811-Seagate-Firecuda-520-1tb/1811-Seagate-Firecuda-520-1tb-cabecera.jpg?f=webp',
  'Samsung 980 1TB':'https://m.media-amazon.com/images/I/71y8ZxXgVOL.jpg',
  // CPU
  'AMD Ryzen 9 7950X':'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg',
  'AMD Ryzen 7 7800X3D':'https://m.media-amazon.com/images/I/51HqC0rU9HL.jpg',
  'AMD Ryzen 5 7600':'https://media.arvutitark.ee/WCNenGIru5B6hJHNpAKbAL5rieE=/trim/fit-in/800x800/https%3A%2F%2Fcms.arvutitark.ee%2Fstorage%2Fmedia-hub-olev%2F2023%2F10%2F465849%2Fhpam-256_hpam_256_01.jpg',
  'Intel Core i9-13900K':'https://sigmatiendas.com/cdn/shop/files/Procesador-Intel-Core-i9-13900K-box2_grande.jpg?v=1689357774',
  'Intel Core i7-13700K':'https://www.topcomputacion.com.ar/wp-content/uploads/2023/01/intel_core_i7_13700k2.jpg',
  'AMD Ryzen 7 5800X':'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-7-5800x-og.jpg',
  'AMD Ryzen 5 5600X':'https://m.media-amazon.com/images/I/51ld6RR8IrL.jpg',
  'Intel Core i5-13600K':'https://m.media-amazon.com/images/I/518UUvBjZdL._AC_UF894,1000_QL80_.jpg',
  'Intel Core i3-13100':'https://www.rptechindia.com/media/catalog/product/i/3/i3-13100f.jpg',
  'AMD Ryzen 9 5900X':'https://sigmatiendas.com/cdn/shop/products/Procesador-AMD-Ryzen-9-5900X-12-Core-Caja_grande.webp?v=1672967753',
  'Intel Core i9-12900K':'https://sigmatiendas.com/products/procesador-intel-core-i9-12900k-16-nucleos-3-2-ghz-30-mb-cache-socket-lga-1700?srsltid=AfmBOopru85FRa5Pa3k-kg0De0xjxoAyQNPRplmAYwl8jEd7Ft81FKli',
  'AMD Ryzen 7 5700G':'https://sigmatiendas.com/cdn/shop/files/PROCESADOR-AMD-RYZEN-7-5700G_grande.jpg?v=1719947006',
  'AMD Ryzen 5 5600G':'https://sigmatiendas.com/cdn/shop/files/Procesador-AMD-RYZEN-5-5600G-con-graficos-integrados-box1_bc513f1a-1570-4295-9a8a-6d2fe0d6eb93.jpg?v=1715180968&width=600',
  'Intel Core i7-12700K':'https://www.achorao.com/cdn/shop/files/intel-procesadores-default-title-procesador-intel-core-i7-12700f-2-10-4-90ghz-25mb-smartcache-lga1700-735858503105-46365609263344_1024x1024.jpg?v=1738881579',
  // Motherboard
  'ASUS ROG Crosshair X670E Hero':'https://m.media-amazon.com/images/I/814lhQLoSKL._AC_SX679_.jpg',
  'MSI MPG B650 Carbon WiFi':'https://m.media-amazon.com/images/I/81mWxkj0TKL._AC_SY450_.jpg',
  'Gigabyte B550 AORUS Pro':'https://m.media-amazon.com/images/I/61O0HRWFXUL._AC_SY450_.jpg',
  'ASRock B550 Phantom Gaming':'https://m.media-amazon.com/images/I/71PIDAOz+lL._AC_SX450_.jpg',
  'ASUS TUF Gaming X570-Plus':'https://m.media-amazon.com/images/I/81JvaK1zSwL.jpg',
  'MSI MAG B660 Tomahawk':'https://asset.msi.com/resize/image/global/product/product_1641451939cdb7ca66ce454f702dc30211fa528964.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
  'Gigabyte Z790 AORUS Elite':'https://m.media-amazon.com/images/I/81a48Z1GciL._AC_SX450_.jpg',
  'ASUS PRIME Z690-A':'https://dlcdnwebimgs.asus.com/gain/2b66b9a7-8ad6-4059-8dd1-ca3a8d443443/w692',
  'MSI B450 Tomahawk Max':'https://asset.msi.com/resize/image/global/product/product_7_20200923154001_5f6afbd1125e2.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
  'ASRock X570 Taichi':'https://asrock.com/mb/photo/X570%20Taichi(M1).png',
  'Gigabyte X570 AORUS Elite':'https://www.gigabyte.com/Image/cc871240c03566b6dcf4c3096a5378f5/ProductRemoveBg/22419',
  'ASUS ROG Strix B550-F':'https://sigmatiendas.com/cdn/shop/products/Tarjeta-Madre-ASUS-Rog-Strix-B550F-Gaming-Motherboard-Caja-Producto_grande.webp?v=1672967796',
  'MSI MEG Z690 ACE':'https://asset.msi.com/resize/image/global/product/product_1635323488caac7e54c8102d9d4ef99a4612e9f8fe.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
  'ASRock B660 Steel Legend':'https://asrock.com/mb/photo/B660%20Steel%20Legend(M1).png',
  // GPU (some examples)
  'NVIDIA GeForce RTX 4090':'https://reviewed-com-res.cloudinary.com/image/fetch/s--l5g4P9Gw--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_1200/https://reviewed-production.s3.amazonaws.com/1665511882932/4090hero.jpg',
  'NVIDIA GeForce RTX 4080':'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/news/geforce-rtx-40-series-ultra-efficient-beyond-fast/nvidia-geforce-rtx-4080-ogimage.png',
  'NVIDIA GeForce RTX 4070 Ti':'https://m.media-amazon.com/images/I/51pXI8c5VkL.jpg',
  'NVIDIA GeForce RTX 4070':'https://specials-images.forbesimg.com/imageserve/64364e72263df60e1eb0e670/960x0.jpg',
  
};

function loadProducts(){
  const category = qs("category") || "all";
  const q = (qs("q")||"").toLowerCase();
  const list = PRODUCTS.filter(p=>{const matchCat=(category==="all")||p.category===category;const matchQ=!q||p.title.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q);return matchCat&&matchQ;});
  const container=document.getElementById("productsList");container.innerHTML="";
  if(list.length===0){container.innerHTML="<p>No se encontraron productos.</p>";return;}
  list.forEach(p=>{
    const card=document.createElement("div");card.className="prod-card";
    card.innerHTML=`
      <img src="${p.image}" alt="${p.title}">
      <div class="prod-info">
        <h4>${p.title}</h4>
        <p class="brand">${p.brand}</p>
        <p class="desc" title="${p.desc}">${p.desc}</p>
        <div class="prod-bottom">
          <strong class="price">${formatPrice(p.price)}</strong>
          <div class="prod-actions">
            <a class="btn" href="products.html?category=${p.category}" title="Ver categoría" aria-label="Ver categoría">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1" fill="currentColor"></rect><rect x="13" y="3" width="8" height="8" rx="1" fill="currentColor"></rect><rect x="3" y="13" width="8" height="8" rx="1" fill="currentColor"></rect><rect x="13" y="13" width="8" height="8" rx="1" fill="currentColor"></rect></svg>
            </a>
            <button class="add" data-id="${p.id}" aria-label="Agregar al carrito" title="Agregar al carrito">
              <svg viewBox="0 0 24 24" class="nav-svg" aria-hidden="true"><path d="M7 4H5l-1 2H2v2h2l3.6 7.6c.2.5.7.8 1.2.8H19v-2h-8.2l-.9-1.9L19 8H8.2L7 4z" fill="currentColor"></path><circle cx="10" cy="19.5" r="1" fill="currentColor"></circle><circle cx="17" cy="19.5" r="1" fill="currentColor"></circle></svg>
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
    
    try{
      const img = card.querySelector('img');
      if(img){
        img.onerror = function(){
          this.onerror = null;
          const fb = fallbackImages[p.title];
          if(fb && this.src !== fb) this.src = fb;
        };
      }
    }catch(e){console.warn('fallback image handler error', e)}
  });
  document.querySelectorAll(".add").forEach(b=>{b.addEventListener("click",()=>{const id=b.dataset.id;addToCart(id);});});
}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;const cart=JSON.parse(localStorage.getItem("kcart")||"[]");const existing=cart.find(i=>i.id===id);if(existing){existing.qty=(existing.qty||1)+1;}else{cart.push({id:p.id,title:p.title,price:p.price,image:p.image,qty:1});}localStorage.setItem("kcart",JSON.stringify(cart));const count=cart.reduce((s,i)=>s+(i.qty||1),0);const el=document.getElementById("cartCount"); if(el) el.textContent=count; if(window.showAddConfirmation) window.showAddConfirmation('Agregado al carrito', p.title);}
document.addEventListener("DOMContentLoaded",()=>{if(document.getElementById("productsList"))loadProducts();});


function showAddConfirmation(title){
  try{
    let m = document.getElementById('confirmModal');
    if(!m){
      m = document.createElement('div'); m.id='confirmModal'; m.className='confirm-modal'; m.setAttribute('aria-live','polite');
      m.innerHTML=`<div class="icon"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor"></path></svg></div><div class="text"><div class="title">Agregado al carrito</div><div id="confirmMsg"></div></div>`;
      document.body.appendChild(m);
    }
    const msg = m.querySelector('#confirmMsg'); if(msg) msg.textContent = title;
    m.style.display='flex'; m.classList.add('show');
    setTimeout(()=>{m.classList.remove('show');},2600);
  }catch(e){console.warn(e)}
}
