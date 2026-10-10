import re

with open('d:/project/LED/LED/advertise.html', 'r', encoding='utf-8') as f:
    adv_content = f.read()

# Extract Navbar
navbar_match = re.search(r'<!-- Navbar -->.*?<!-- Hero Section -->', adv_content, re.DOTALL)
navbar = navbar_match.group(0).replace('<!-- Hero Section -->', '') if navbar_match else ''
# Update active links
navbar = navbar.replace('text-[#0B1E36] border-b-2 border-[#E5B05C]', 'hover:text-[#0B1E36] transition-colors')
# Make "Our Screens" active
navbar = re.sub(r'(<a href="network.html" class=")(hover:text-\[#0B1E36\] transition-colors)( pb-1">Our Screens</a>)', r'\1text-[#0B1E36] border-b-2 border-[#E5B05C]\3', navbar)

# Extract Map Dashboard
locations_match = re.search(r'<!-- Location Discovery -->.*?<!-- Screen Detail Spotlight -->', adv_content, re.DOTALL)
locations_section = locations_match.group(0).replace('<!-- Screen Detail Spotlight -->', '') if locations_match else ''

# Extract Footer
cta_match = re.search(r'<!-- CTA Section -->.*', adv_content, re.DOTALL)
footer = cta_match.group(0) if cta_match else ''

new_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LUMIÈRE | Our Network</title>
    <link href="./style.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-white text-[#111827] font-inter antialiased selection:bg-[#E5B05C] selection:text-white">

{navbar}

    <!-- Hero Section -->
    <section class="relative w-full h-[55vh] min-h-[450px] flex items-center mt-[72px] overflow-hidden" style="background-color: #0B1E36;">
        <div class="absolute inset-0 z-0 w-full h-full">
            <img src="./images/world_map_network.jpg" onerror="this.src='./images/city_ny.jpg'" class="w-full h-full object-cover" alt="Global Network">
            <div class="absolute inset-0 w-full h-full" style="background: linear-gradient(to right, rgba(11, 30, 54, 0.98) 0%, rgba(11, 30, 54, 0.7) 50%, rgba(11, 30, 54, 0.1) 100%);"></div>
        </div>
        <div class="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
            <div class="max-w-2xl">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-8 h-[2px] bg-[#E5B05C]"></div>
                    <span class="text-[11px] font-bold tracking-[0.2em] text-[#E5B05C] uppercase">Our Global Reach</span>
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-[1.05] mb-6 tracking-tight">
                    Connecting Brands.<br>Everywhere You Look.
                </h1>
                <p class="text-gray-300 text-[15px] md:text-lg leading-relaxed mb-10 max-w-[500px]">
                    Discover our rapidly expanding network of 150+ premium digital displays across major metropolitan hubs. Unleash the power of high-impact advertising globally.
                </p>
                <div class="flex gap-4">
                    <a href="#locations" class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E5B05C] text-[#0B1E36] text-[13px] font-bold hover:bg-white transition-colors rounded-sm shadow-sm group">
                        Explore Screens
                        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Global Footprint Stats -->
    <section class="py-16 bg-white border-b border-gray-100">
        <div class="max-w-[1400px] mx-auto px-6 md:px-12">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
                <div class="flex flex-col">
                    <h3 class="text-4xl md:text-5xl font-bold text-[#0B1E36] mb-2">150+</h3>
                    <p class="text-[13px] font-semibold text-gray-800 uppercase tracking-widest mb-2">Premium Screens</p>
                    <p class="text-[12px] text-gray-500">LED & digital billboards worldwide</p>
                </div>
                <div class="flex flex-col border-l border-gray-100 pl-8">
                    <h3 class="text-4xl md:text-5xl font-bold text-[#0B1E36] mb-2">25+</h3>
                    <p class="text-[13px] font-semibold text-gray-800 uppercase tracking-widest mb-2">Major Cities</p>
                    <p class="text-[12px] text-gray-500">Business & leisure destinations</p>
                </div>
                <div class="flex flex-col border-l border-gray-100 pl-8">
                    <h3 class="text-4xl md:text-5xl font-bold text-[#0B1E36] mb-2">12+</h3>
                    <p class="text-[13px] font-semibold text-gray-800 uppercase tracking-widest mb-2">Key Markets</p>
                    <p class="text-[12px] text-gray-500">Across 4 distinct continents</p>
                </div>
                <div class="flex flex-col border-l border-gray-100 pl-8">
                    <h3 class="text-4xl md:text-5xl font-bold text-[#0B1E36] mb-2">24/7</h3>
                    <p class="text-[13px] font-semibold text-gray-800 uppercase tracking-widest mb-2">Active Network</p>
                    <p class="text-[12px] text-gray-500">Always on, always visible</p>
                </div>
            </div>
        </div>
    </section>

{locations_section}

    <!-- Explore by City -->
    <section class="py-24 bg-slate-50 border-t border-gray-100">
        <div class="max-w-[1400px] mx-auto px-6 md:px-12">
            <div class="mb-12">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-8 h-[2px] bg-[#E5B05C]"></div>
                    <span class="text-[10px] font-bold tracking-[0.2em] text-[#0B1E36] uppercase">Popular Cities</span>
                </div>
                <h2 class="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0B1E36] leading-[1.1] mb-6 tracking-tight">
                    Explore by City
                </h2>
                <p class="text-gray-500 text-[15px] leading-relaxed max-w-lg">
                    Discover our top cities and their premium screen locations.
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                <!-- NY -->
                <a href="#locations" class="group block relative h-64 overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <img src="./images/city_ny.jpg" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="New York">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0B1E36] via-[#0B1E36]/40 to-transparent"></div>
                    <div class="absolute bottom-6 left-6">
                        <h3 class="text-xl font-bold text-white mb-1">New York</h3>
                        <p class="text-[12px] font-medium text-gray-300">12 Screens</p>
                    </div>
                </a>
                
                <!-- Dubai -->
                <a href="#locations" class="group block relative h-64 overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <img src="./images/city_dubai.jpg" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Dubai">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0B1E36] via-[#0B1E36]/40 to-transparent"></div>
                    <div class="absolute bottom-6 left-6">
                        <h3 class="text-xl font-bold text-white mb-1">Dubai</h3>
                        <p class="text-[12px] font-medium text-gray-300">10 Screens</p>
                    </div>
                </a>
                
                <!-- London -->
                <a href="#locations" class="group block relative h-64 overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <img src="./images/city_london.jpg" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="London">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0B1E36] via-[#0B1E36]/40 to-transparent"></div>
                    <div class="absolute bottom-6 left-6">
                        <h3 class="text-xl font-bold text-white mb-1">London</h3>
                        <p class="text-[12px] font-medium text-gray-300">8 Screens</p>
                    </div>
                </a>
                
                <!-- Singapore -->
                <a href="#locations" class="group block relative h-64 overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <img src="./images/city_singapore.jpg" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Singapore">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0B1E36] via-[#0B1E36]/40 to-transparent"></div>
                    <div class="absolute bottom-6 left-6">
                        <h3 class="text-xl font-bold text-white mb-1">Singapore</h3>
                        <p class="text-[12px] font-medium text-gray-300">6 Screens</p>
                    </div>
                </a>
            </div>
        </div>
    </section>

{footer}
'''

with open('d:/project/LED/LED/network.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
